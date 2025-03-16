---
title: A Philosophy of Software Design, by John Ousterhout
layout: single
excerpt: I was attracted to the book for two reasons. John, and "philosophy". John's experience is unquestionable; there's a lot to glean from the book. However…
---

&nbsp;

**tl;dr**

This should not have been a book — for many reasons — could as well have been a
bullet list. The summary I have at the end of this article is the whole book.
Skip there if you don't care about my reasoning.

---

I first learned about John Ousterhout from a video on YouTube about Homa: a
proposed better network protocol to replace TCP in data centers. A huge claim
since TCP has stood the test of time despite its flaws; but John's approach to
argumentation in the video made me go search for anything man's written. My
assumption was: "If he does this well in a lecture, how awesome would his
publications and books be?" That's how I landed on the book in the title of
this post. Finally, I thought, some philosophizing on software and its design.

It was clear, from the book, that John has a wealth of experience. Somehow,
that did not translate into _how_ the book was written — emphasis on "how"
because the "what" had a lot of experience thrown into it. Why is this
a concern? I did not see as much philosophy as marketed in the title of the
book. The book read like something one of these new tech-bro-influencer types
vibe-wrote on live stream. Few central (and deep!) points, plenty fluff.

_p.s. (aside): When writing this article, I originally (mistakenly) named it "Principles of Software Design" because that's what I felt like I'd just finished reading; not "Philosophy of..."_

If this book was called "Principles of…" or "Postulates of…", it would have
read better. This is because the book is pretty much its headings.

1. Complexity is
  - caused by dependency and obscurity;
  - witnessed as change amplification, cognitive load, and unknown unknowns
1. Modules should be deep
1. Pay attention to the interfaces
1. Document clearly and consistently; in comments and in code
1. Iterate on design

These are the five points which stood out to me from the book; with the first,
on complexity, being the centre (and if you ask me, the only) point in this
book. Around these points, John shows his experience with verbose examples.
Now… there's a crowd for which such writing is required. My intuition (because
an empirical lemma would require me to experiment) is that this crowd is those
rely heavily on memory, and require constant repetition to memorize / learn. If
you're in this crowd, this book is perfect. I reckon (again an intuition) that
true software engineers — not the recent niche tutorial-baked crop — are
logical thinkers, _in primo_, able to deduce the end of a statement once its
form becomes salient. To this bunch, this book will be a waste of time.

## My 10 Commandments of Software Design
_as inspired by John Ousterhout_

1. If you must depend, depend explicitly.
1. Make the change simple, then make the simple change. (verbatim from Kent Beck)
1. Deepen modules; for lesser cognitive load.
1. Start with documentation describing the what and why; not the how.
1. Beware of interfaces. Each one creates a new dependency.
1. Never intentionally obscure. Be consistently obvious to a fault.
1. Do not vibe code. Do a little design up front.
1. Document and iterate on your design.
1. Guard every changeset jealously. Complexity, like scope, creeps… until it's too large to handle.
1. Pull complexity downwards. Expose as little complexity to your users.
