interface IUseLocalStorage {
    setLocalStorage: (name: string, data: any) => void;
    getLocalStorage: (name: string) => any;
}

function useLocalStorage(): IUseLocalStorage {
    function setLocalStorage(name: string, data: any) {
        localStorage.setItem(name, JSON.stringify(data));
    }
    function getLocalStorage(name: string) {
        return JSON.parse(localStorage.getItem(name)!);
    }
    return {
        setLocalStorage,
        getLocalStorage,
    };
}

export {
    useLocalStorage,
}