# Project Images

Drop your image files here. Then set the paths in src/data/projects.js.

## Required sizes per project

| Field          | Ratio | Recommended size | Usage                               |
|---------------|-------|-----------------|-------------------------------------|
| images.square | 1:1   | 800x800 px      | Grid card background                |
| images.wide   | 16:9  | 1920x1080 px    | Section hover background (Work)     |
| images.poster | 2:3   | 600x900 px      | Modal right panel                   |

## Example (in projects.js)

    images: {
      square: "/images/society-of-the-snow-square.jpg",
      wide:   "/images/society-of-the-snow-wide.jpg",
      poster: "/images/society-of-the-snow-poster.jpg",
    }

Any field set to null falls back to the CSS gradient (color field).
Files can be JPG, WebP, or PNG. WebP is recommended for best performance.
