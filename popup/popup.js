const browserApi = "browser" in globalThis ? browser : chrome;
(async () => {
  const get = async (key) => (await browserApi.storage.local.get(key))?.[key];
  const set = (key, value) => browserApi.storage.local.set({ [key]: value });

  // initial values
  const fetchEntriesDynamically = await get("fetchEntriesDynamically");
  const updateCurrentEntries = await get("updateCurrentEntries");
  const highlightChanges = await get("highlightChanges");

  // elements
  const fetchEntriesDynamicallyEl = getInput("#fetchEntriesDynamically");
  const updateCurrentEntriesEl = getInput("#updateCurrentEntries");
  const highlightChangesEl = getInput("#highlightChanges");

  // set initial values
  fetchEntriesDynamicallyEl.checked = fetchEntriesDynamically ?? true;
  updateCurrentEntriesEl.checked = updateCurrentEntries ?? true;
  highlightChangesEl.checked = highlightChanges ?? true;

  // bind event listeners
  fetchEntriesDynamicallyEl.addEventListener("change", () => {
    set("fetchEntriesDynamically", fetchEntriesDynamicallyEl.checked);
  });
  updateCurrentEntriesEl.addEventListener("change", () => {
    set("updateCurrentEntries", updateCurrentEntriesEl.checked);
  });
  highlightChangesEl.addEventListener("change", () => {
    set("highlightChanges", highlightChangesEl.checked);
  });
})();

function getInput(selector) {
  const element = document.querySelector(selector);
  if (!(element instanceof HTMLInputElement)) {
    throw new Error(`"${selector}" is not an input.`);
  }
  return element;
}
