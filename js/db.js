export const insertData = async (data) => {
  try {
    const result = await (
      await fetch("https://sheetdb.io/api/v1/089lzmxl5ymnb", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      })
    ).json();
    localStorage.setItem("visited", JSON.stringify("true"));
    return result;
  } catch (error) {
    console.log(error);
  }
};
