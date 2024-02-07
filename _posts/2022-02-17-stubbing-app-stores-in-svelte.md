---
layout: single
title: Stubbing <span class="code">$app/stores</span> in Svelte Kit
date: 2022-02-17 12:52 +0000
author: yaasky
categories:
    - tooling
tags:
    - javascript
    - svelte
    - testing
    - mocks
    - stubs
---

# What is Svelte Kit?

First, [Svelte][4]. Svelte is one of the many front-end frameworks in the Javascript space. In the [2021 State of JS][1] report, Svelte ranked 2nd in satisfaction, 1st in interest, 4th in usage and awareness. When I looked into the framework and the cleanliness of its principles, I realized why it ranked so high in satisfaction and interest. I use [Svelte Kit][5] with Svelte. It's an opinionated way to write your front-end applications. I use Svelte Kit because I'm coming back into this JS madness from way back when jQuery was the coolest kid on the block. Svelte Kit provides some sane defaults for project structure, and some good helpers for development. Some of such helpers are the wrappers around [Svelte stores][7]; a simpler take on global storage. Ideally, it's a simpler Redux.js. With Svelte Kit, the app's session is a Svelte store you can subscribe to, and work with.

# Our use case

Our use case is a simple user registration process. Form data is sent over the wire and is validated on the server. The server then responds with the user data, which is stored in the client's session.

```js
<script>
  import { session } from '$app/stores'

  async function register() {
    const registered = await post(`api/register`, form_data)

    if (registered.user) {
      $session.user = registered.user

      // Do some other things now that we are registered
      // - maybe redirect to some home page?
    } else {
      // Handle errors from server
    }
  }
</script>

<div>
  <!-- UI for Registration -->
  <p>Our Component</p>
</div>
```

This is a contrived version of the registration page; enough to show us the happy path.

We want to write a lint test here. This lint test should verify the static parts of our component. Our testing strategy is simple:

1. Render the component.
1. Find the node with the required text.
1. Ensure this node is present.

# Testing

Testing in Javascript these days... well, that's another — how to say? — wild forest to tame. As with front-end, there are [a lot of testing frameworks][2]. In my setup, I am using [Testing Library][6] for Svelte with Jest.

> I like testing. I believe **tests are a harness on your application which bind it, contractually, to your requirements**. Whether these tests are written before your write the implementation (TDD) or after (DDT), is not really a concern; so long as the feature ships with the test.

## Svelte Testing with Jest and Testing Library

Here, we'd setup Jest, Testing Library, and other tools necessary to test a Svelte app

### Add the tools to your app

```sh
yarn add --dev testing-library/svelte testing-library/jest-dom svelte-jester jest babel-jest
```

Ideally, Jest would be brought in as a dependency of Svelte-Jester; but we want to ensure we include Jest as a direct dependency in our application. This way if we, for some reason, swap out `svelte-jester` for something else, we don't automatically lose `jest`.

### Setup Jest for Svelte

I have the Jest settings in my `package.json`. I prefer this, instead of the multiplicity of config files.

```json
  "jest": {
    "transform": {
      "^.+\\.js$": "babel-jest",
      "^.+\\.svelte$": [
        "svelte-jester"
      ]
    },
    "moduleFileExtensions": [ "js", "svelte" ],
    "moduleNameMapper": {},
    "setupFilesAfterEnv": [
      "@testing-library/jest-dom/extend-expect"
    ],
    "testEnvironment": "jsdom"
  }
```

- `transform` defines tools which changes the source file — at runtime — to something Jest understands
- `moduleFileExtensions` defines the files we are concerned about in testing
- `moduleNameMapper` transforms sugar routes in the application to file paths Jest can import from
- `setupFilesAfterEnv` adds extended testing capabilities
- `testEnvironment` specifies the testing environment

### Write test for static content

Here, we want to test that our component renders correctly. Our component renders a `div` with some text in it. We would be writing a test to verify this text renders properly. You know, lint testing; the simple stuff.

```js
import { render, screen } from '@testing-library/svelte'
import OurComponent from './index.svelte'

describe('OurComponent', () => {
  it('has "Our Component" as text', () => {
    render(OurComponent)
    const node = screen.queryByText("Our Component")
    expect(node).not.toBeNull()
  })
})
```

Seems simple enough. This test, however, fails when it's run. It fails because `$app/stores` is not a path Jest can readily understand. In Svelte Kit's' case, `$app/stores` is not a path at all. It's a store vended by the framework, as explained earlier.

```sh
FAIL src/routes/ourComponent/index.test.js
  ● Test suite failed to run

    Cannot find module '$app/stores' from 'src/routes/ourComponent/index.svelte'

    Require stack:
      src/routes/ourComponent/index.svelte
      src/routes/ourComponent/index.test.js

      1 | <script>
    > 2 |   import { session } from '$app/stores'
        |                   ^
      3 |   async function register() {
      4 |     const registered = await post(`api/register`, form_data)
      5 |

      at Resolver.resolveModule (node_modules/jest-resolve/build/resolver.js:324:11)
      at Object.<anonymous> (src/routes/ourComponent/index.svelte:2:19)
```

# Mocking Stores

Stores are global. This means if we can create a stub store, inject it into our application during test, the component would be none the wiser. In other languages I've worked with, I prefer keeping my stubs (preferably mocks) local to the test I am writing. This is possible in my test environment, but I do not know this right now. If you do, [tweet @ me][3]. Our method here is slightly ...roundabout.

### 1. Help Jest resolve the "module" to a local file

With our `moduleNameMapper` config in Jest, we can tell Jest the files to load when it sees an import statement trying to load modules which match certain regex patterns.

```json
  "jest": {
    "moduleNameMapper": {
      ...
      "^\\$app(.*)$": "<rootDir>/test/stubs$1"
    }
  }
```

Remember to create the path you are resolving these module loads to. This way, when Jest sees any anywhere in our code where we attempt importing from `$app/stores`, Jest will attempt to import from `/path/to/our_project/test/stubs/stores.js`. Pretty neat!

### 2. Stub out the stores

In our stubs folder, we can create a `stores.js` file. This file will act as contents of our stubs.

```js
import { writable } from 'svelte/stores'

export const session = writable({})
```

### 3. Run tests!

Running our tests now show that our tests pass with no further changes to the test file nor the component file.

To peek into the contents of the store at test runtime,

```js
import { session } from '$app/stores'
// ... other relevant imports

describe('Some tests', () => {
  it('logs session contents', () => {
    let someSessionContent
    session.subscribe((value) => { someSessionContent = value.someSessionContent })
    render(OurComponent)
    // perform some action
    console.log(someSessionContent)
  })
})
```

### 4. Complex Stub Initialization

We are using a global stub for a global store. While this works all well and good, there's a little problem here.In our use case, `OurComponent` requires an empty store. What happens when we have a component which requires the store to be prepopulated with some value? We have to get the data in there somehow. Since stores are objects anyways, and we have our stubs, we can always prepopulate them before the test is run.

```js
// in your test file...

import { session } from '$app/stores'  // grabs stub store

describe('Test with Custom Stub', () => {
  beforeEach(() => {
    session.set({
      custom: [
        'data',
        as: {
          you: 'wish'
        }
      ]
    })
  })

  it('has custom data in session', () => {
    let actualCustom
    session.subscribe((data) => { actualCustom = data.custom })
    console.log(actualCustom.as.you)  // 'wish'
  })
})
```

# Conclusion

Stores in Svelte represent global state. Svelte Kit offers some default stores to handle different app states. When writing tests for a component using stores, stub them out by having Jest resolve your store imports to a local stub. If some component needs some initial data in the store, this can always be set before the test case runs.

  [1]: https://2021.stateofjs.com/en-US/libraries/front-end-frameworks
  [2]: https://2021.stateofjs.com/en-US/libraries/testing
  [3]: https://twitter.com/yaasky
  [4]: https://svelte.dev/
  [5]: https://kit.svelte.dev/
  [6]: https://testing-library.com
  [7]: https://svelte.dev/tutorial/writable-stores
