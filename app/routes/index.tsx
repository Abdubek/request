import type { MetaFunction, LoaderFunction, ActionFunction } from "remix";
import { useLoaderData, json, Form } from "remix";
import { db } from "~/utils/db.server";
import { createRequestDoc, Request } from "~/domain/request";
import { sendToStorage } from "../domain/request";

type IndexData = {};

export let loader: LoaderFunction = () => {
  let data: IndexData = {
  };
  return json(data);
};

export let meta: MetaFunction = () => {
  return {
    title: "Request App",
    description: "Welcome to Request App!"
  };
};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    fio: string | undefined;
    flight: string | undefined;
    advancedInfo: string | undefined;
  };
  fields?: Request;
};

export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  const form = await request.formData();
  const fio = form.get("fio") as string;
  const flight = form.get("flight") as string;
  const advancedInfo = form.get("advancedInfo") as string;


  const fields = { fio, flight, advancedInfo };


  const newRequest = await db.request.create({ data: fields });

  createRequestDoc(newRequest);
  await sendToStorage(newRequest);

  return {
    fields,
    formError: "",
    fieldErrors: {
      fio: "",
      flight: "",
      advancedInfo: ""
    }
  };
}


export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <div className="p-4">
      <h1 className="text-lg font-medium leading-6 text-gray-900 mb-5">Наша главная цель — помочь клиентам получить компенсацию за их неудобства, в которые входят отмена и задержка рейса.</h1>

      <ul className="mb-5">
        <li>1. Все страны, все авиакомпании!</li>
        <li>2. Мы взимаем плату за услуги только в том случае, если вашу заявку удовлетворяют! Сумма вознаграждения вычитается из суммы компенсации, полученной от авиакомпании и составляет 25%. Если заявка остается неудовлетворенной, Вам не нужно за неё платить.</li>
        <li>3. Полное сопровождение ваших интересов!</li>
      </ul>

      <Form method="post" reloadDocument>
        <div className="mb-4">
          <label htmlFor="fio" className="block text-sm font-medium text-gray-700">ФИО</label>
          <input name="fio"
                 id="fio"
                 type="text"
                 required={true}
                 className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="flight" className="block text-sm font-medium text-gray-700">Номер рейса</label>
          <input name="flight"
                 id="flight"
                 type="text"
                 required={true}
                 className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="advancedInfo" className="block text-sm font-medium text-gray-700">Дополнительная информация</label>
          <textarea name="advancedInfo"
                 id="advancedInfo"
                 rows={5}
                 className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
        </div>
        {/*<div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Cover photo</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>*/}

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
