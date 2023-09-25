import * as elements from "typed-html";
import { DefaultLayout } from "../DefaultLayout";
import { MfeInfo } from "../../models/schema";
import { List } from "../components/List";
import { Navigation } from "../components/Navigation";
import { AddForm } from "../components/Form";

export const ListPage = (
  url: string,
  environments: string[],
  environment: string,
  info: MfeInfo,
) => (
  <DefaultLayout>
    <div class="flex items-center flex-col">
      <h1 class="p-6 space-x-4 text-4xl font-bold dark:text-gray-100 capitalize">
        {environment}
      </h1>
      {Navigation(url, environments)}
      {AddForm(environment)}
      {List(environment, info)}
    </div>
  </DefaultLayout>
);
