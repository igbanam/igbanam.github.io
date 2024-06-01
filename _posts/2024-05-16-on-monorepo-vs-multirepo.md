---
layout: single
title: On MonoRepo vs. MultiRepo
date: 2024-05-16 09:23:38 +0000
author: yaasky
categories:
    - opinion
description: Some advice to start-ups on how they should organize their repositories
image:
locale: en-GB
tags:
    - start-up
    - teams
    - repository
---

This conversation topic never converges. Like Willie said earlier, "It's largely a matter of taste."

In software engineering, like in other engineering disciplines, every decision is a tradeoff. The fallacy embedded in the "Which is best?" question often lock minds in a divergent discussion. Some examples: which language is best to do X with? What's the best deployment strategy? What communication pattern works best? …and so on… and the original post's (OP) question. The approach to answering these questions — because they will come — is to understand the parameters of the environment in which these answers would be implemented.

In the OP's case, what's the shape of the startup, and in what environment does it operate in? The OP already hinted "less than ten engineers". I'll further assume this is a collaborative environment with a variance in skills set per engineer. On these assumptions, it's hard to create more than two engineering teams with ten engineers. — For the environment, hinted from "start-up", I assume there's one product the company wants to vend to market; and the start-up is still in its "explore" phase. Thus the shape looks something like "2 (max) teams exploring the market with one product".

With this shape, I would suggest a monorepo. Less cognitive load. More nimble with market-fit experiments.

As the start-up grows, and the shape varies, this decision may change. Here are a couple tips to guide that change

Respect Conway's Law. Those who do not respect this law end up with a very messy organization structure which in turn slows innovation within the organization.
Only scale at the service boundary. If you run a delivery business, there's no point buying extra trucks if the order volume is low. Same thing applies to software teams. Measure the market pressure; scale to meet it.

This is how it should be… but software, like most popular industries, is now driven by hype, and in the wrong direction. So start-ups burden themselves with decisions made by and for enterprise. Some examples Kubernetes (and other orchestration software) was made to solve the orchestration problem when you have many services. React was specifically made for Facebook's problem. Multi-repo was born from multiple teams seeking autonomy. — if your company doesn't have these problems, it doesn't need these solutions.
