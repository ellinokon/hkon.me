---
title: "Fathom: Self-hosted analytics with ease using Dokku"
layout: post
date: 2019-01-13
tags:
  - Fathom
  - Analytics
  - Privacy
  - Dokku
lead: "Collecting trends and insights from your website visitors does not have
  to involve a sacrifice to corporate devils."
---

Most websites have no real need for storing personal information about their
visitors. Yet, that is the situation we are currently living. Heaps of websites
collecting all they can get their hands on, funnelling it to one or more third
parties. All in the name of more ad revenue, marketing, etc.

While the pros and cons this system could be debated further, I think it is
about time we explore options that don't involve such a heavy sacrifice on the
part of our visitors. Today I'm going to introduce one such option: [Fathom](https://usefathom.com/).

Fathom is web analytics done simple. Only the bare essential facts you need
about a website, without the tracking or storing of personal data. This makes it
easy to comply with laws such as GDPR, but most importantly it protects our
visitors privacy by default. No pesky popups and silly hoops to jump through in
order to not get tracked!

The following is an easy to follow guide to setting up a self-hosted instance of
Fathom on your own server, using [Dokku](https://github.com/dokku/dokku) to ease
both setup and maintenance.

## Setup guide

### 1. Acquire a server with Dokku

First of all we need a server with Dokku installed. [Dokku one-click install](https://www.digitalocean.com/products/one-click-apps/dokku/)
using a Digital Ocean VPS should serve us just fine, and the whole process is
actually quite close to being only "one click". Pretty smooth if you ask me!

Once our droplet has been created we'll have to visit the droplet's IP in order
to finish the installation:

- If you added your SSH public key during the installation process it will
already be filled out.
- Hostname is either a domain of your choice, or the droplet's IP.
- Last remaining choice is which type of URL scheme you want. Personally I
prefer using virtualhost naming with a custom domain specified in hostname.

More info regarding the installed environment can be gleamed from [these docs](https://www.digitalocean.com/docs/one-clicks/dokku/).

### 2. Installing Fathom on the server

After basic setup is finished we move on to configuring Fathom in Dokku. For
this installation we'll be using a [pre-built Docker image](https://hub.docker.com/r/usefathom/fathom/),
kindly provided to us by the team behind Fathom.

We'll have to SSH into the newly created server in order to run the following
commands:

```
$ dokku apps:create fathom
$ docker pull usefathom/fathom:latest
$ docker tag usefathom/fathom:latest dokku/fathom:latest
$ dokku tags:deploy fathom latest
```

Fathom is now installed and running under port `8080` for our defined hostname.
To be able to reach the application we need to change the port in Dokku from the
default `8080` to `80`.

```
$ dokku proxy:ports-add fathom http:80:8080
$ dokku proxy:ports-remove fathom http:8080:8080
```

At this point you should be able to reach the application at your chosen
hostname, e.g. `fathom.hostname.com`.

If you are like me though, you might feel the need to clean up the domain:

```
$ dokku domains:add fathom fathom.pragmati.no
$ dokku domains:remove fathom fathom.dokku.pragmati.no
```

### 3. Adding SSL

In order to get the tracking to function correctly we need to enable SSL. Thanks
to Lets Encrypt this couldn't be any easier! Remember to replace the example
email with yours:

```
$ sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
$ dokku config:set --no-restart fathom DOKKU_LETSENCRYPT_EMAIL=email@example.com
$ dokku letsencrypt fathom
$ dokku letsencrypt:cron-job --add
```

### 4. Set up the tracking code

Upon visiting the newly installed instance of Fathom for the first time a
prompt will be presented, asking for details on which domain to track. In my
case I input `hkon.me`, and got this tracking code in return:

```js
<!-- Fathom - simple website analytics - https://github.com/usefathom/fathom -->
<script>
(function(f, a, t, h, o, m){
	a[h]=a[h]||function(){
		(a[h].q=a[h].q||[]).push(arguments)
	};
	o=f.createElement('script'),
	m=f.getElementsByTagName('script')[0];
	o.async=1; o.src=t; o.id='fathom-script';
	m.parentNode.insertBefore(o,m)
})(document, window, '//fathom.pragmati.no/tracker.js', 'fathom');
fathom('set', 'siteId', 'GWETW');
fathom('trackPageview');
</script>
<!-- / Fathom -->
```

Obviously you'll get a different one. It's important to copy the exact code
provided to you by Fathom, as this is what you'll need to track anonymous
website traffic.

When done right, fresh data should start ticking in as soon as your arrive. As
an example, [my current Fathom setup](https://fathom.pragmati.no/) is available
to check out.

## In conclusion

Fathom is amazingly simple to set up. Protecting your visitors privacy, while
still gathering valuable traffic insight, has proved to be an easy choice to
make.

If you don't want to deal with a self-hosted instance of Fathom, the team behind
it provides a [fully-managed service for you](https://usefathom.com/#pricing).
The price for their SaaS is definitely nothing to balk at, and well worth the
time saved on both setup and maintenance.
