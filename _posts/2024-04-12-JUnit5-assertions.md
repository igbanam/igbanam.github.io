---
layout: single
title: JUnit5 Assertions
date: 2024-04-12 21:07:04 +0000
author: yaasky
categories:
    - tooling
description: A pare down of JUnit assertions
image:
locale: en-GB
tags:
    - java
    - junit5
    - lsp
---

Developing using an LSP is one of the greatest achievements in developer experience of our time. Now, you can learn the language as you go with "help" coming from the editor. The co-pilots of this world take LSP to the next level. But sometimes, just sometimes, you get to the point where you want to know what's happening under the hood. Me figuring out just how many assertions the JUnit5 API has is one of these times.

I started by [RTFM](https://junit.org/junit5/docs/5.0.1/api/org/junit/jupiter/api/Assertions.html). That didn't help. Java has held on to strong typing since it began. In addition to its strong typing is the verboseness of the language. This could scare some people away; but there's merit to this. Details of this merit is left to the reader to either figure out and comment insights on this blog post, or reach out to me on Twitter for more light. This verboseness can sometimes make …TFM hard to read. Plus, coming from a terser language like Ruby, it's okay to make assumptions on the form of a thing and iterate on that assumption whenever the form breaks / does not align with the reality it interfaces with. So…

If you, like future me, does not want to RTFM on the JUnit5 Assertions API, these are all the assertions pared down to what they actually do.

```java
T assertThrows
static void assertAll
static void assertArrayEquals
static void assertEquals
static void assertFalse
static void assertIterableEquals
static void assertLinesMatch
static void assertNotEquals
static void assertNotNull
static void assertNotSame
static void assertNull
static void assertSame
static void (or <T> T) assertTimeout
static void (or <T> T) assertTimeoutPreemptively
static void assertTrue
```
