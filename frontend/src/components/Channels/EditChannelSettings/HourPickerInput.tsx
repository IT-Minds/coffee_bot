import { Input } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HourPickerInput: FC<Props> = props => {
  return (
    <div>
      <Input
        type="time"
        list="hourMarks"
        value={(props.value < 10 ? "0" : "") + props.value + ":00"}
        step="3600"
        onChange={props.onChange}
      />
      <datalist id="hourMarks">
        <option value="00:00"></option>
        <option value="01:00"></option>
        <option value="02:00"></option>
        <option value="03:00"></option>
        <option value="04:00"></option>
        <option value="05:00"></option>
        <option value="06:00"></option>
        <option value="07:00"></option>
        <option value="08:00"></option>
        <option value="09:00"></option>
        <option value="10:00"></option>
        <option value="11:00"></option>
        <option value="12:00"></option>
        <option value="13:00"></option>
        <option value="14:00"></option>
        <option value="15:00"></option>
        <option value="16:00"></option>
        <option value="17:00"></option>
        <option value="18:00"></option>
        <option value="19:00"></option>
        <option value="20:00"></option>
        <option value="21:00"></option>
        <option value="22:00"></option>
        <option value="23:00"></option>
      </datalist>
    </div>
  );
};

export default HourPickerInput;
