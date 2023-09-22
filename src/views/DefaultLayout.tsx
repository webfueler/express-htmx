import * as elements from "typed-html";

export const DefaultLayout = ({ children }: elements.Children) => `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registry Manager</title>
        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
        <link rel="stylesheet" href="/assets/index.css">
    </head>
    <body class="dark:bg-gray-900 antialiased">
        <main class="max-w-5xl mx-auto">
            ${children}
        </main>
    </body>
</html>
`;
