import * as elements from "typed-html";
import { DefaultLayout } from "../DefaultLayout";
import { Navigation } from "../components/Navigation";

export const HomePage = (url: string, environments: string[]) => (
  <DefaultLayout>
    <div class="flex items-center flex-col">
      <h1 class="p-6 space-x-4 text-4xl font-bold dark:text-gray-100">
        Choose Environment
      </h1>
      {Navigation(url, environments)}
    </div>
  </DefaultLayout>
);
