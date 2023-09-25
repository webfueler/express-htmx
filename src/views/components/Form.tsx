/* eslint-disable jsx-a11y/label-has-associated-control */
import * as elements from "typed-html";

export const AddForm = (environment: string) => (
  <div class="py-10 w-full">
    <h2 class="p-6 space-x-4 text-3xl font-bold dark:text-gray-100 capitalize">
      Add new package
    </h2>
    <form hx-post={`/${environment}`} hx-target="#list" hx-swap="outerHTML">
      <div class="mb-6">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Bundle name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="@your-org/package-name"
          required="required"
        />
      </div>
      <div class="mb-6">
        <label
          for="url"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Url (absolute url if not using `manifest` option)
        </label>
        <input
          type="text"
          id="url"
          name="url"
          placeholder="https://cdn.example.com/micro-frontend-a"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required="required"
        />
      </div>
      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            id="manifest"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            checked="checked"
          />
        </div>
        <label
          for="manifest"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Use manifest
        </label>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add package to {environment}
      </button>
    </form>
  </div>
);
