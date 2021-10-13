"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePages = void 0;
const utils_1 = require("../../../utils");
const fs_1 = require("fs");
const generatePages = async (userInput) => {
    const modelName = userInput[2];
    if (!modelName) {
        return `no modelName recieved`;
    }
    const upperCaseFirstLetterModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    let modelItems = userInput.slice(3);
    let neWModelSchemaItemsForIndex = [];
    let neWModelSchemaItemsForDynamicPage = [];
    let jsonBodyForForm = [];
    let formFieldItems = [];
    let editFormFieldItems = [];
    modelItems.map((unSplitEntry) => {
        let entry = unSplitEntry.split(":");
        let entryName = entry[0];
        let modelFieldForIndex = `<p className="text-lg text-gray-500 truncate">${entryName}: {${modelName}.${entryName}}</p>`;
        let modelFieldForDynamicPage = `<div className=\`sm:col-span-6\`><label htmlFor=\`${entryName}\` className=\`block text-3xl font-light text-gray-700\`>${entryName}</label><div className=\`mt-1 flex rounded-md shadow-sm\`><h1 id=\`year\`>{props.${modelName}.${entryName}}</h1></div></div>`;
        let jsonBodyField = ` ${entryName}: event.target.${entryName}.value`;
        let formField = `<div className="flex flex-col m-4 p-2 text-center"> \
                    <label htmlFor="${entryName}" className="text-2xl"> \
                    ${entryName} \
                    </label> \
                    <input \
                      type="text" \
                      name="${entryName}" \
                      id="${entryName}" \
                      className="py-4 m-1  bg-gray-350 rounded" \
                      required \
                    /> \
                  </div>`;
        let editFormField = `<div className="flex flex-col m-4 p-2 text-center"> \
                      <label htmlFor="${entryName}" className="text-2xl"> \
                      ${entryName} \
                      </label> \
                      <input \
                        defaultValue={props.${modelName}.${entryName}} \
                        type="text" \
                        name="${entryName}" \
                        id="${entryName}" \
                        className="py-4 m-1  bg-gray-350 rounded" \
                        required \
                      /> \
                    </div>`;
        neWModelSchemaItemsForIndex.push(JSON.stringify(modelFieldForIndex));
        neWModelSchemaItemsForDynamicPage.push(JSON.stringify(modelFieldForDynamicPage));
        jsonBodyForForm.push(JSON.stringify(jsonBodyField));
        formFieldItems.push(formField);
        editFormFieldItems.push(editFormField);
    });
    let finalSchemaItemsForIndex = neWModelSchemaItemsForIndex
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/,/g, "")
        .replace(/"/g, "");
    let finalSchemaItemsForDynamicPage = neWModelSchemaItemsForDynamicPage
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/`/g, "")
        .replace(/,/g, "")
        .replace(/"/g, "");
    let finalJsonBodyItems = jsonBodyForForm
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/`/g, "")
        .replace(/"/g, "");
    let finalFormFieldItems = formFieldItems
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/,/g, "");
    let finalEditFormFieldItems = editFormFieldItems
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/,/g, "");
    const indexPage = `${finalSchemaItemsForIndex}`;
    const dynamicPage = `
  import Link from 'next/link'
import { useRouter } from "next/router";

export default function ${modelName}Details(props) {
  // router object from next
  const router = useRouter();

  const ${modelName} = props.${modelName}

  return (
    <div className="bg-gray-700 h-screen">
      <div className="p-2">
        <div className=" m-4 p-4 rounded-md bg-gray-400 font-light space-y-8 ">
          <form >
            <div>
              <h3 className="text-4xl leading-6 font-light text-gray-900">Show ${upperCaseFirstLetterModelName}</h3>
            </div>

            <div className="text-xl mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              ${finalSchemaItemsForDynamicPage}
              <div className="m-2 p-2 w-full">
                <div className="  flex justify-start">
                  <button
                    onClick={() => router.back()}
                    type="button"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                  <Link href={"/${modelName}s/edit${upperCaseFirstLetterModelName}s/" + ${modelName}._id}>
                    <a className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                      Edit
                    </a>
                  </Link>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(\`http://localhost:3000/api/${modelName}s\`);

  const data = await res.json();

  const staticPathParams = [];

  await data.${modelName}s.map((${modelName}) => {
    staticPathParams.push({ params: { ${modelName}Id: ${modelName}._id } });
  });

  return {
    paths: staticPathParams,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  // fetch ${modelName} data from api here
  const ${modelName}Id = context.params.${modelName}Id;
  const res = await fetch(\`http://localhost:3000/api/${modelName}s/\${${modelName}Id}\`);

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ${modelName}: data.${modelName},
    },
  };
};
  `;
    const createPage = `
  import React from "react";

export default function create${upperCaseFirstLetterModelName}() {
  const createNew${upperCaseFirstLetterModelName} = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3000/api/${modelName}s", {
      body: JSON.stringify({
        ${finalJsonBodyItems}
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  return (
    <div className="bg-blue-500 h-screen w-full flex flex-col justify-center">
      <form
        className="w-1/2 flex flex-col justify-center self-center"
        onSubmit={createNew${upperCaseFirstLetterModelName}}
      >
      ${finalFormFieldItems}
      <input
      type="submit"
      value="Create ${upperCaseFirstLetterModelName}"
      className="bg-gray-350 hover:bg-green-500 font-2xl rounded px-10 py-4 m-2"
    ></input>
      </form>
    </div>
  );
}

  `;
    const editPage = `
  import { useRouter } from "next/router";

export default function edit${upperCaseFirstLetterModelName}(props) {
  // router object from next
  const router = useRouter();

  const ${modelName}Id = router.query.${modelName}Id;


  const update${upperCaseFirstLetterModelName} = async (event) => {
    event.preventDefault();

    const res = await fetch(\`http://localhost:3000/api/${modelName}s/\${${modelName}Id}\`, {
      body: JSON.stringify({
        ${finalJsonBodyItems}
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });
  };

  return (
    <div className="bg-blue-500 h-screen w-full flex flex-col justify-center">
      <form
        className="w-1/2 flex flex-col justify-center self-center"
        onSubmit={update${upperCaseFirstLetterModelName}}
      >
        ${finalEditFormFieldItems}
      <input
          type="submit"
          value="Update ${upperCaseFirstLetterModelName}"
          className="bg-gray-350 hover:bg-green-500 font-2xl rounded px-10 py-4 m-2"
        ></input>
      </form>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(\`http://localhost:3000/api/${modelName}s\`);

  const data = await res.json();

  const staticPathParams = [];

  await data.${modelName}s.map((${modelName}) => {
    staticPathParams.push({ params: { ${modelName}Id: ${modelName}._id } });
  });

  return {
    paths: staticPathParams,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  // fetch ${modelName} data from api here
  const ${modelName}Id = context.params.${modelName}Id;
  const res = await fetch(\`http://localhost:3000/api/${modelName}s/\${${modelName}Id}\`);

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ${modelName}: data.${modelName},
    },
  };
};

  `;
    if (!(0, fs_1.existsSync)(`pages`)) {
        await (0, utils_1.createDirectory)("pages");
    }
    if (!(0, fs_1.existsSync)(`pages/${modelName}s`)) {
        await (0, utils_1.createDirectory)(`pages/${modelName}s`);
    }
    if (!(0, fs_1.existsSync)(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`)) {
        await (0, utils_1.createDirectory)(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`);
    }
    if (!(0, fs_1.existsSync)(`.env.local`)) {
        await (0, utils_1.createFile)(".env.local", `MONGODB_URI=your-database-string-here
    MONGODB_DB=your-database-name-here    
    `);
    }
    (0, utils_1.createFile)(`pages/${modelName}s/index.js`, indexPage);
    (0, utils_1.createFile)(`pages/${modelName}s/[${modelName}Id].js`, dynamicPage);
    (0, utils_1.createFile)(`pages/${modelName}s/create${upperCaseFirstLetterModelName}.js`, createPage);
    (0, utils_1.createFile)(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s/[${modelName}Id].js`, editPage);
};
exports.generatePages = generatePages;
