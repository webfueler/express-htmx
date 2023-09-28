import * as elements from "typed-html";
import { MfeInfo } from "../../models/schema";

export const List = (
  environment: string,
  info: MfeInfo,
  children?: elements.Children["children"],
) => (
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg w-full mt-10"
    id="list"
  >
    {children && children}
    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      hx-confirm="Are you sure?"
      hx-target="#list"
      hx-swap="outerHTML"
    >
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            jsBundle
          </th>
          <th scope="col" class="px-6 py-3">
            cssBundle
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(info).map(([name, { jsBundle, cssBundle }]) => (
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {name}
            </th>
            <td class="px-6 py-4">{jsBundle}</td>
            <td class="px-6 py-4">{cssBundle}</td>
            <td class="px-6 py-4 text-right">
              <button
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                hx-delete={`/${environment}/${encodeURIComponent(name)}`}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
