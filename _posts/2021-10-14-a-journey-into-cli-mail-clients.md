---
layout: post
title: A Journey into CLI Mail Clients
date: 2021-10-14 23:38 +0100
author: igbanam
category: blog
tag:
  - cli
  - email
  - vim
---

I enjoy GMail shortcuts. I don't use up to 10% of the available shortcuts, but the ability to navigate with the keyboard has always been fascinating. While playing with GMail shortcuts, I wondered "Surely, there must be a way to read email in the terminal. I don't want to keep opening my browser every time I have mail." A little googling and I found some interesting projects.

## Himalaya

[Himalaya][1] is a CLI email client written in Rust. I had seen other email clients, but what [attracted me][5] to Himalaya was its optional Vim front, and the simplicity in setup. You can get up and running in no time. Another cool feature is the `imap-password-cmd` option in the setup. This allows you use a password manager to store your passwords locally; thus your password never gets into a config file. I have mine setup with [Bitwarden][2]

### Setting up Himalaya

1. Create a new file at `~/.config/himalaya/config.toml`.
1. Dump the configuration below into that file
1. Change everything in angle brackets <> to your personal information

...as easy as 1, 2, 3!

```toml
name = "<MY NAME>"
downloads-dir = "/global/path/to/your/downloads/folder"
signature = """

--
<MY NAME>, written in Himalaya
"""

[gmail]
default = true
email = "<MY ALIAS>@gmail.com"

imap-host = "imap.gmail.com"
imap-port = 993
imap-login = "<MY ALIAS>@gmail.com"
imap-passwd-cmd = "bw get password Himalaya-GMail"

smtp-host = "smtp.gmail.com"
smtp-port = 465
smtp-login = "<MY ALIAS>@gmail.com"
smtp-passwd-cmd = "bw get password Himalaya-GMail"
```

This is all the setup required for Himalaya; for GMail. Other mail servers like Yahoo and Hotmail would have different authentication details.

### Pros and Cons

**Pros**
- The interface is small enough for you to get it
- Configuration is password-safe
- IT HAS A VIM FRONT END 🔥🔥🔥

**Cons**
- Every is a new request, is a new connection to the mail server
- Very much in its alpha stage; not yet production ready


## Mutt

[Mutt][3] comes off in the _interwebs_ as the most robust terminal client for emails. The project is more than 20 years old. There's a lot more control over email in Mutt. The basic configuration to get started however, is not much different from Himalaya.

### Getting started with Mutt

Mutt is a lot like Vim: everyone's setup is a tad bit different. But there are some similarities which yield a baseline. To get started with Mutt, we need to know some things about emails. The SMTP protocol is plenty. Here's my setup.

First, some pre-requisites

```muttrc
mkdir -p ~/.mutt/{headers, bodies}
touch ~/.mutt/certificates
```

Then my `~/.mutt/muttrc` follows.

```muttrc
# ===============  IMAP Settings  ===================
set imap_user = "<MY ALIAS>@gmail.com"
set imap_pass = "<MY PASSWORD>"
set smtp_url = "smtp://<MY ALIAS>@smtp.gmail.com:587/"
set smtp_pass = $imap_pass
set ssl_force_tls = yes
set smtp_authenticators = 'gssapi:login'

# ============  Folder Organization  ================
set folder = "imaps://imap.gmail.com/"
set spoolfile = "+INBOX"
set postponed = "+[Gmail]/Drafts"
set record = "+[Gmail]/Sent Mail"
set trash = "+[Gmail]/Trash"

# ===============  Mutt Specifics  ==================
set header_cache = "~/.mutt/cache/headers"
set message_cachedir = "~/.mutt/cache/bodies"
set certificate_file = "~/.mutt/certificates"
```

### Pros and Cons

**Pros**
- Mutt does everything email; so robust!
- You can theme Mutt ...the same way you theme Vim
- The muttrc allows you to [setup Mutt like Vim][4]

**Cons**
- Learning Curve


## A Note on Security

For congruent setups across devices, you may want to check-in your configuration into source control. Remember it is safe to do this for Himalaya, it may not be safe to do this in Mutt if you have your password plain in your muttrc. One way to solve this problem is to have your password as an environment variable in your shell

In `~/.zprofile` (or somewhere)

```sh
export MUTT_IMAP_PASS=<MY PASSWORD>
```

then in your `~/.mutt/muttrc`

```muttrc
set imap_pass = $MUTT_IMAP_PASS
```

## My journey so far...

I am currently interested in both projects. Himalaya as the new contender, and Mutt as the veteran in the space. On Himalaya... I am [actively contributing][5] to Himalaya's Vim front. I believe it has a lot of potential. Though — I must confess — there's the gnawing voice at the back of my head telling me "This project stretches Vim beyond what it was built for." But it's interesting to work with email in the same space you work with code. On Mutt... I am learning the space. If the shortcuts feel too alien, I would look to merge my Vim ~~habits~~ bindings into Mutt. For now, I am still playing with the colors. Next steop, multi-account emails in Mutt. My Mutt is wired up to send emails using Vim; this too is possible.

We move

# 🚀

  [1]: https://github.com/soywod/himalaya
  [2]: https://bitwarden.com/
  [3]: http://www.mutt.org/
  [4]: https://ryanlue.com/posts/2017-05-21-mutt-the-vim-way
  [5]: https://github.com/soywod/himalaya/pull/224
