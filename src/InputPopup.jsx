/* eslint-disable no-unused-vars */
import React from "react";

const InputPopup = () => {
  const [datas, setDatas] = React.useState([]);
  const [currentData, setCurrentData] = React.useState(null);

  // //   console.log(datas);

  // let data = [...datas];
  // const handleChange = (e) => {
  //   const { type, name, value, files } = e.target;
  //   const fileType = files[0].type;
  //   // console.log(type, files[0].type);

  //   data.push({
  //     data_type:
  //       type === "text"
  //         ? type
  //         : fileType.startsWith("audio/")
  //         ? "audio"
  //         : fileType.startsWith("video/")
  //         ? "video"
  //         : fileType.startsWith("image/")
  //         ? "image"
  //         : null,
  //     data: value || files[0],
  //   });

  //   setDatas(data);
  // };

  // console.log(data);

  const handleChange = (e) => {
    const { type, id, value, files } = e.target;
    const fileType = files?.[0]?.type || null;

    setCurrentData({
      id: id,
      data_type:
        type === 'text'
          ? 'text'
          : fileType?.startsWith('audio/')
          ? 'audio'
          : fileType?.startsWith('video/')
          ? 'video'
          : fileType?.startsWith('image/')
          ? 'image'
          : fileType === 'application/pdf'
          ? 'pdf'
          : null,
      data: type === 'file' ? files[0] : value,
    });
  };

  const handleBlur = () => {
    if (currentData) {
      // Add or update the entry only when the input loses focus (onBlur)
      let data = [...datas];

      const existingIndex = data.findIndex((entry) => entry.id === currentData.id);

      if (existingIndex > -1) {
        // Update existing entry
        data[existingIndex] = currentData;
      } else {
        // Add new entry
        data.push(currentData);
      }

      setDatas(data); // Update the datas array
      console.log(data); // Log the updated array
    }

    // Reset currentData after blur to avoid re-using it
    setCurrentData(null);
  };

  console.log(datas)

  return (
    <div>
      <input
        placeholder="text input"
        type="text"
        onChange={handleChange}
        name="data"
         onFocus={() => setCurrentData(null)} // Clear current data when focused
         onBlur={handleBlur} // Update data on blur
      />
      <input
        placeholder="audio input"
        type="file"
        onChange={handleChange}
        name="data"
         onFocus={() => setCurrentData(null)} // Clear current data when focused
         onBlur={handleBlur} // Update data on blur
      />
      <input
        placeholder="video input"
        type="file"
        onChange={handleChange}
        name="data"
         onFocus={() => setCurrentData(null)} // Clear current data when focused
         onBlur={handleBlur} // Update data on blur
      />
      <input
        placeholder="image input"
        type="file"
        onChange={handleChange}
        name="data"
         onFocus={() => setCurrentData(null)} // Clear current data when focused
         onBlur={handleBlur} // Update data on blur
      />
    </div>
  );
};

export default InputPopup;
