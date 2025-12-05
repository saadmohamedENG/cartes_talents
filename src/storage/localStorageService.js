const LocalStorageService = (function () {
  const isSupported = (() => {
    try {
      const testKey = "__test_localstorage__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  })();

  function get(key, defaultValue = null) {
    if (!isSupported) return defaultValue;
    const raw = window.localStorage.getItem(key);
    if (!raw) return defaultValue;
    try {
      return JSON.parse(raw);
    } catch {
      return defaultValue;
    }
  }

  function set(key, value) {
    if (!isSupported) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function remove(key) {
    if (!isSupported) return;
    window.localStorage.removeItem(key);
  }

  return {
    get,
    set,
    remove,
  };
})();
