import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { OutletContext } from "~/types/main";
import { DbTables } from "~/types/db";

const colors = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
];

export default function ColorPopover({
  currentColor,
  currentGroupId,
  outletContext,
}: {
  currentColor: string;
  currentGroupId: string;
  outletContext: OutletContext;
}) {
  const update = (value: string) => {
    (async function () {
      await outletContext.supabase
        .from(DbTables.TRANSACTION_GROUP)
        .update({ color: value })
        .eq("id", currentGroupId);
    })();
  };
  return (
    <>
      <Select onValueChange={update} defaultValue={currentColor}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a color" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="h-[300px] overflow-scroll">
            <SelectLabel>Colors</SelectLabel>
            {colors.map((color) => (
              <SelectItem key={color} value={color} className="flex flex-row">
                <span
                  className="p-1 mr-2"
                  style={{
                    backgroundColor: color,
                  }}
                ></span>
                {color}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* <Popover>
        <PopoverTrigger>
          {" "}
          <div
            className="w-[20px] h-[20px] rounded-full border"
            style={{
              backgroundColor: currentColor,
            }}
          ></div>
        </PopoverTrigger>
        <PopoverContent className="h-[300px] overflow-scroll">
          {colors.map((color) => (
            <div
              key={color}
              className="flex p-2 align-center cursor-pointer hover:bg-slate-100 rounded-md"
            >
              <div
                className="w-[20px] h-[20px] rounded-full mr-2 border"
                style={{
                  backgroundColor: color,
                }}
              ></div>
              <div className=" align-middle">{color}</div>
            </div>
          ))}
        </PopoverContent>
      </Popover> */}
    </>
  );
}
