import * as elements from "typed-html";

export const Navigation = (url: string, environments: string[]) => (
  <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 w-full">
    <ul class="flex flex-wrap -mb-px">
      {environments.map((env) => (
        <li class="mr-2">
          <a
            href={`/${env}`}
            class={
              url.includes(env)
                ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
            {...(url.includes(env)
              ? {
                  "aria-current": "page",
                }
              : {})}
          >
            {env}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
