import * as React from "react"

const SvgMap = (props: React.SVGProps<SVGSVGElement>) => {
  // State to track which shape is being hovered
  const [hoveredShape, setHoveredShape] = React.useState<string | null>(null)

  // Function to handle mouse enter
  const handleMouseEnter = (shapeId: string) => {
    setHoveredShape(shapeId)
  }

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredShape(null)
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1214}
      height={754}
      fill="none"
      className="transition-all duration-300"
      {...props}
    >
      <path fill="#D9D9D9" d="M0 0h1214v754H0z" />
      
      {/* Blue Square */}
      <path 
        id="blueSquare"
        fill={hoveredShape === "blueSquare" ? "#7060FF" : "#50F"} 
        onClick={()=>{alert("blueSquare")}}
        d="M522 162h195v195H522z" 
        className={`cursor-pointer transition-all duration-300 ${hoveredShape === "blueSquare" ? "stroke-2 stroke-black" : ""}`}
        onMouseEnter={() => handleMouseEnter("blueSquare")}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Red Circle */}
      <path
        id="redCircle"
        fill={hoveredShape === "redCircle" ? "#FF5252" : "#FF0202"}
        d="M371 260c0 52.467-42.533 95-95 95s-95-42.533-95-95 42.533-95 95-95 95 42.533 95 95Z"
        className={`cursor-pointer transition-all duration-300 ${hoveredShape === "redCircle" ? "stroke-2 stroke-black" : ""}`}
        onMouseEnter={() => handleMouseEnter("redCircle")}
        onClick={()=>{alert("redCircle")}}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Green Star */}
      <path
        id="greenStar"
        fill={hoveredShape === "greenStar" ? "#20FF60" : "#0F4"}
        d="m939 173 19.533 60.116h63.207l-51.135 37.153 19.532 60.115L939 293.231l-51.137 37.153 19.532-60.115-51.137-37.153h63.209L939 173Z"
        className={`cursor-pointer transition-all duration-300 ${hoveredShape === "greenStar" ? "stroke-2 stroke-black" : ""}`}
        onMouseEnter={() => handleMouseEnter("greenStar")}
        onClick={()=>{alert("greenStar")}}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Black Shape 1 */}
      <path
        id="blackShape1"
        fill={hoveredShape === "blackShape1" ? "#333" : "#000"}
        d="M302.5 464.5c-26.833 20.667-66.9 66.8-12.5 86l57.5-24-45-62Z"
        className={`cursor-pointer transition-all duration-300 ${hoveredShape === "blackShape1" ? "stroke-2 stroke-white" : "stroke-[0.5] stroke-black"}`}
        onMouseEnter={() => handleMouseEnter("blackShape1")}
        onClick={()=>{alert("blackShape1")}}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Black Shape 2 */}
      <path
        id="blackShape2"
        fill={hoveredShape === "blackShape2" ? "#333" : "#000"}
        d="M510 425l-84 154.5L553.5 631 732 566.5 510 425Z"
        className={`cursor-pointer transition-all duration-300 ${hoveredShape === "blackShape2" ? "stroke-2 stroke-white" : "stroke-[0.5] stroke-black"}`}
        onMouseEnter={() => handleMouseEnter("blackShape2")}
        onClick={()=>{alert("blackShape2")}}
        onMouseLeave={handleMouseLeave}
      />
    </svg>
  )
}

export default SvgMap 