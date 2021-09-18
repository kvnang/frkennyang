# Fr. Kenny Ang

[![Netlify Status](https://api.netlify.com/api/v1/badges/970d5631-7128-4373-994d-e2faa80ff7ec/deploy-status)](https://app.netlify.com/sites/frkennyang/deploys)

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

### Writing a Post

#### Front Matter

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

#### Body

For more information on Markdown syntaxes, visit the following links (not everything is tested):

1. [Basic Syntax](https://www.markdownguide.org/basic-syntax/)
2. [Extended Syntax](https://www.markdownguide.org/extended-syntax/)
3. [Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)

## 🚀 Development Quick Start

1.  **Pull Repository**

    Get a fresh copy of the repository

    ```shell
    git clone https://github.com/kvnang/frkennyang.git
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd frkennyang/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

4.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
