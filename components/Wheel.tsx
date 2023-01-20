import { useAppSelector } from "@core/redux/hooks";
import { selectMovieIds } from "@core/movies/movieSlice";

const getSectorPath = (
  innerRadius: number,
  startAngle: number,
  sectorAngle: number
) => {
  const degreesToRads = (2 * Math.PI) / 360;
  const endAngle = (startAngle + sectorAngle) * degreesToRads;
  const startAngleRads = startAngle * degreesToRads;
  const cx1 = Math.cos(endAngle) * innerRadius;
  const cy1 = -Math.sin(endAngle) * innerRadius;
  const cx2 = Math.cos(startAngleRads) * innerRadius;
  const cy2 = -Math.sin(startAngleRads) * innerRadius;

  return `M0 0 ${cx1} ${cy1} A${innerRadius} ${innerRadius} 0 0 1 ${cx2} ${cy2}Z`;
};

const randomColor = () => {
  const color = Math.floor(Math.random() * 16777216).toString(16);
  return "#000000".slice(0, -color.length) + color;
};

const Sector: React.FC<{ sectorCount: number; sectorIndex: number }> = ({
  sectorCount,
  sectorIndex,
}) => {
  if (sectorIndex >= sectorCount) {
    throw new Error("Sector index much be strictly less than sector count.");
  } else if (sectorCount == 1) {
    return <circle r={99} fill={randomColor()} />;
  } else {
    const startAngle = (sectorIndex / sectorCount) * 360;
    const sectorAngle = 360 / sectorCount;
    return (
      <path
        d={getSectorPath(99, startAngle, sectorAngle)}
        fill={randomColor()}
      />
    );
  }
};

const Wheel: React.FC = () => {
  const movieIds = useAppSelector(selectMovieIds);
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="XMidYMid meet">
      <g transform="translate(100, 100)" stroke="#000" strokeWidth={1}>
        {movieIds.map((id, idx) => (
          <Sector key={id} sectorCount={movieIds.length} sectorIndex={idx} />
        ))}
      </g>
    </svg>
  );
};

export default Wheel;
