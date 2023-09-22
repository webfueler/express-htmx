import * as elements from "typed-html";

export const Navigation = (url: string, environments: string[]) => (
  <ul class="p-8 flex gap-2">
    {environments.map((env) => (
      <li>
        <a
          href={`/${env}`}
          class={`block rounded-md border-zinc-100 p-2 border-2 no-underline hover:bg-blue-300 hover:text-white dark:text-zinc-100 ${
            url.includes(env) ? "bg-blue-300 text-white" : ""
          }`}
        >
          {env}
        </a>
      </li>
    ))}
  </ul>
);
