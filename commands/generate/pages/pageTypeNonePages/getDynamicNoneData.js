"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicNoneData = void 0;
const getDynamicNoneData = (modelName, modelItems) => {
    let neWModelSchemaItemsForIndex = [];
    let neWModelSchemaItemsForDynamicPage = [];
    let jsonBodyForForm = [];
    let formFieldItems = [];
    let editFormFieldItems = [];
    modelItems.map((unSplitEntry) => {
        let entry = unSplitEntry.split(":");
        let entryName = entry[0];
        let modelFieldForIndex = `<p>${entryName}: {${modelName}.${entryName}}</p> `;
        let modelFieldForDynamicPage = `<div><label htmlFor=^${entryName}^>${entryName}</label><div><h1 id=^year^>{props.${modelName}.${entryName}}</h1></div></div>`;
        let jsonBodyField = ` ${entryName}: event.target.${entryName}.value`;
        let formField = `<div>
                          <label htmlFor="${entryName}">
                            ${entryName}
                          </label>
                          <div>
                            <input
                              type="text"
                              name="${entryName}"
                              id="${entryName}"
                              autoComplete="${entryName}"
                            />
                          </div>
                        </div>`;
        let editFormField = `<div>
        <label htmlFor="${entryName}">
          ${entryName}
        </label>
        <div>
          <input
          defaultValue={props.${modelName}.${entryName}}
            type="text"
            name="${entryName}"
            id="${entryName}"
            autoComplete="${entryName}"
          />
        </div>
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
        .replace(/`/g, "")
        .replace(/"/g, "")
        .replace(/\^/g, `"`);
    let finalSchemaItemsForDynamicPage = neWModelSchemaItemsForDynamicPage
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/`/g, "")
        .replace(/,/g, "")
        .replace(/"/g, "")
        .replace(/\^/g, `"`);
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
    let finalDynamicData = {
        finalSchemaItemsForIndex: finalSchemaItemsForIndex,
        finalSchemaItemsForDynamicPage: finalSchemaItemsForDynamicPage,
        finalJsonBodyItems: finalJsonBodyItems,
        finalFormFieldItems: finalFormFieldItems,
        finalEditFormFieldItems: finalEditFormFieldItems,
    };
    return finalDynamicData;
};
exports.getDynamicNoneData = getDynamicNoneData;
