import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputNumber, InputNumberProps } from "antd";
import React, { useState } from "react";

interface MInputQuantityProps extends InputNumberProps {
    onClickPlus: React.MouseEventHandler<SVGSVGElement>;
    onClickMinus: React.MouseEventHandler<SVGSVGElement>;
}

const InputQuantity = (props: MInputQuantityProps) => {
    const { onClickMinus, onClickPlus, disabled, max, ...rest } = props;
    return (
        <div className="flex align-middle select-none">
            <FontAwesomeIcon
                className={`p-2 transition-colors cursor-pointer ${
                    disabled
                        ? "bg-gray-200 text-gray-400"
                        : "bg-slate-100 text-black hover:bg-blue-300"
                }`}
                icon={faMinus}
                onClick={disabled ? () => {} : onClickMinus}
            />

            <InputNumber
                min={1}
                max={max}
                controls={false}
                maxLength={2}
                style={{ width: 40, height: 32, borderRadius: 0 }}
                inputMode="numeric"
                disabled={disabled}
                {...rest}
            />
            <FontAwesomeIcon
                className={`p-2 transition-colors cursor-pointer ${
                    disabled
                        ? "bg-gray-200 text-gray-400"
                        : "bg-slate-100 text-black hover:bg-blue-300"
                }`}
                icon={faPlus}
                onClick={disabled ? () => {} : onClickPlus}
            />
        </div>
    );
};

export default InputQuantity;
