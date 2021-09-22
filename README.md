# Fr. Kenny Ang

[![Netlify Status](https://api.netlify.com/api/v1/badges/970d5631-7128-4373-994d-e2faa80ff7ec/deploy-status)](https://app.netlify.com/sites/frkennyang/deploys)

Fr. Kenny Ang's [personal website](https://www.fatherkenny.com) built on React + Gatsby.

## Table of Contents

- [Updating Posts](#updating-posts)
- [Writing a Post](#writing-a-post)
  - [Front Matter](#front-matter)
  - [Body](#body)
  - [Images](#images)
    - [Best Practices](#best-practices)
    - [Alignment](#alignment)
    - [Captions](#captions)
  - [Headings](#headings)
  - [Links](#links)
  - [Book Component](#book-component)
- [Web Analytics](#web-analytics)

## Updating Posts

Posts can be found under `src/posts` folder. Each post consists of a folder with a unique name. That folder contains an `index.md` file and all the necessary assets such as images. For translation, create a file named `index.{lang}.md`, for example `index.id.md`. Currently this site only supports ID (Bahasa Indonesia) and EN (English), which is the default.

Basic folder structure:

```
posts
  |-- Post Title 1
    |-- index.md
    |-- index.id.md (optional)
    |-- image123.jpg
  |-- Post Title 2
    |-- index.md
    |-- etc ...
```

## Writing a Post

### Front Matter

In your `index.md` file, you will need to write some data in Front Matter. Front Matter must be written at the very top of the document, sandwiched between two lines of triple hyphens (`---`), like this:

```markdown
---
title: Lorem Ipsum
featuredImage: image.jpg
format: Article
date: 2020-02-01
category:
  - Homily
  - Mass
excerpt: Lorem ipsum
---
```

Currently supported Front Matter data is as follows:

1. `title`: Title of the post / article
2. `featuredImage`: Featured image, referencing file name within the same folder as the `.md` file
3. `format`: Choose `Article` or `Video`
4. `date`: Date when the post is published. Must be in `YYYY-MM-DD` format.
5. `category`: An array of categories of the post (can be more than one). See above for formatting
6. `excerpt`: Short excerpt of the post. Recommended length is less than 250 characters.

### Body

For more information on Markdown syntaxes, visit the following links (not everything is tested):

1. [Basic Syntax](https://www.markdownguide.org/basic-syntax/)
2. [Extended Syntax](https://www.markdownguide.org/extended-syntax/)
3. [Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)

### Images

#### Best Practices

1. **Image dimension.** Image width should be <= 1800px for full-sized images. Images of **landscape** orientation is always preferred than portrait.
2. **Image compression.** Try to upload images that are less than 300 KB. It's recommended to run the image through a compression tool such as [Squoosh](https://squoosh.app/) first before using them. For optimal compression, for images without transparency, compress them to MozJPEG format. If they have transparency, compress them to OxiPNG format.
3. **Image source.** Ensure that you have the right to use all your images. If you need to use stock images, ensure that they are royalty-free, or else you might need to credit properly. For example, [Unsplash](https://unsplash.com/) has royalty-free stock images.
4. **Image alternative text.** Ensure that images have proper alternative texts. This is crucial for the site's accessibility and SEO. Alternative text needs to be wrapped by square brackets (`[your alt text here]`) before the image source reference, for example:

```markdown
![Child studying](child.jpg)
```

#### Alignment

For inline images (i.e. images used within the body of your post, _not_ as featured image), you may choose to align the image to right / left (and therefore wrapping some texts on the opposite side). To do so, you need to use the following syntax:

```markdown
![Child studying](child.jpg '#float=left')
```

Adding `'#float=left'` after the image source will align the image to the left. To align it to the right, use `'#float=right'` instead.

Inline images will always be of 45% width of the container on all viewports except on mobile viewports, where 100% width will be maintained.

#### Captions

To caption an image, add the caption as image `title`, with the following syntax in Markdown:

```markdown
![Child studying](child.jpg 'Credit: lorem ipsum')
```

If the image has a specific styling such as `#float=left`, you will need to specify `title=` before the image caption, for example;

<!-- prettier-ignore -->
```markdown
                      style attribute(s)  image title / caption
                               ▼           ▼
![Child studying](child.jpg '#float=left;title=Image Title')
                                        ▲
                           Don't forget the separator   
```

_Important_: Make sure to separate each attributes with `;` as shown above.

### Headings

A few important notes:

1. Ensure that headings remain _hierarchical_, that is, don't use Heading 4 (`#### Title`) after Heading 2 (`## Title`), but use Heading 3 (`### Title`) instead.
2. Ensure that Heading 1 is used only for the post title. For other headings, start with Heading 2.
3. Every heading will be automatically hyperlinked, so that you can share the link of the post anchored to a specific heading. You can get this link by hovering over a specific heading, clicking the link icon on the left-hand side, and copy the URL on your browser.

### Links

Ensure that internal links (i.e. links pointing towards a URL within the same site) use _relative path_ instead of _absolute path_. A relative path is essentially an absolute path without the protocol & hostname, i.e. `https://www.fatherkenny.com`. An example of relative path is as follows:

```markdown
[Learn more](/about)
```

Whereas an absolute path is as follows:

```markdown
[View on Facebook](https://www.facebook.com/)
```

### Book Component

A book component is a custom component where you can show an image of a book, with its title, description and link.

![Book Component](https://www.fatherkenny.com/book-md-component.jpg)

To use this component, you will need to copy and paste the following HTML code directly to your Markdown file:

```html
<div class="book">
  <div class="book__img">
    <div class="book__img__inner">
      <img src="{image.jpg}" alt="{Image description}" />
    </div>
  </div>
  <div class="book__text">
    <h4>
      <a href="{/path/to/book}" target="_blank" rel="noopener noreferrer">
        {Book Title}
      </a>
    </h4>
    <h6>{Book metadata / author}</h6>
    <p>{Book description ...}</p>
  </div>
</div>
```

Note that you'll need to replace to contents wrapped by `{ }` (including the curly brackets) in the example above.

You can also remove certain elements by removing the HTML opening & closing tags entirely. For example, if you don't want to include the Book metadata / author section:

```html
<div class="book">
  <div class="book__img">
    <div class="book__img__inner">
      <img src="{image.jpg}" alt="{Image description}" />
    </div>
  </div>
  <div class="book__text">
    <h4>
      <a href="{/path/to/book}" target="_blank" rel="noopener noreferrer">
        {Book Title}
      </a>
    </h4>
    <p>{Book description ...}</p>
  </div>
</div>
```

## Web Analytics

Web Analytics are provided by Cloudflare. To view reports:

1. Log in to [Cloudflare](https://dash.cloudflare.com/login/)
2. Select your account (`Kenny Ang`)
3. Click `Web Analytics` on the right hand sidebar.
4. Click the site (`fatherkenny.com`) to view analytics.
