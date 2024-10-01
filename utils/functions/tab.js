

export const getTabList = () => {
    let tl;

    tl = TabList.getNames().map(a => a.removeFormatting())
    return tl;
}
