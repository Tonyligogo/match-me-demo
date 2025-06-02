import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { PiSliders } from "react-icons/pi";
import {
  Select,
  SelectItem,
  Slider,
  Spinner,
  Switch,
} from "@nextui-org/react";
import { useFilters } from "@/hooks/useFilters";

export default function FilterWidget() {
    const {
        orderByList,
        genderList,
        selectAge,
        selectGender,
        selectOrder,
        selectWithPhoto,
        filters,
      } = useFilters();
    
      const { gender, ageRange, orderBy } = filters;
  return (
    <Popover
      backdrop="transparent"
      placement="right"
    >
      <PopoverTrigger>
        <Button className="bg-transparent"><PiSliders size={24}/></Button>
      </PopoverTrigger>
      <PopoverContent className="w-[80vw] items-start pl-4 lg:w-[50vw] py-8">
        <p className="text-primaryBlue font-semibold text-xl">Search for Your Stars</p>
      <div className="flex flex-col mt-5 gap-2">
          <p className="text-primaryBlue text-lg font-semibold">Gender</p>
          <div className="flex gap-5">
          {genderList.map(
            ({ label, value }) => (
              <Button
                key={value}
                className={`${gender.includes(value)
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-primaryBlue"} px-4 rounded-lg`}
                onClick={() =>
                  selectGender(value)
                }
              >
                {label}
              </Button>
            )
          )}
          </div>
        </div>
        <div className="w-3/4 mt-2">
          <p className="text-lg text-primaryBlue font-semibold">Age</p>
        <div className="flex flex-row items-center gap-2 w-full">
          <Slider
            size="sm"
            label='Age range'
            minValue={18}
            maxValue={100}
            defaultValue={ageRange}
            aria-label="Age range slider"
            color="foreground"
            onChangeEnd={(value) =>
              selectAge(value as number[])
            }
          />
        </div>
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-lg mb-1 text-primaryBlue font-semibold">With photo</p>
          <Switch
            color="default"
            defaultSelected
            size="sm"
            onChange={(checked) =>
              selectWithPhoto(checked)
            }
          />
        </div>
        <div className="w-3/4 mt-2">
        <p className="text-lg mb-1 font-semibold text-primaryBlue">Order results by</p>
          <Select
            size="lg"
            fullWidth
            variant="bordered"
            color="default"
            aria-label="Order by selector"
            selectedKeys={new Set([orderBy])}
            onSelectionChange={selectOrder}
          >
            {orderByList.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        
      </PopoverContent>
    </Popover>
  );
}
