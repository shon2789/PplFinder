import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({ isChecked, onChange, label, value, setUserFilter, userFilter }) => {

  const handleChange = () => {
    onChange && onChange(value);
    const clonedFilter = JSON.parse(JSON.stringify(userFilter))

    if (userFilter.country.includes(value)) {
      const idx = userFilter.country.indexOf(value)
      clonedFilter.country.splice(idx, 1)
    } else {
      clonedFilter.country.push(value)
    }
    setUserFilter(clonedFilter)

  };
  return (
    <S.CheckBox>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleChange} color="primary" />}
        label={label}
      />
    </S.CheckBox>
  );
};

export default CheckBox;
