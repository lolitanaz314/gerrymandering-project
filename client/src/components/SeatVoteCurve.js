import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

//fake democratic data
const coordsD = [{ Democratic: 0.00022949621331248032, Republican: 0.061224489795918366 },
{ Democratic: 0.0005439910241481014, Republican: 0.08163265306122448 },
{ Democratic: 0.0010624824690392606, Republican: 0.1020408163265306 },
{ Democratic: 0.0018359697064998426, Republican: 0.12244897959183673 },
{ Democratic: 0.0029154518950437313, Republican: 0.14285714285714285 },
{ Democratic: 0.004351928193184812, Republican: 0.16326530612244897 },
{ Democratic: 0.0061963977594369675, Republican: 0.18367346938775508 },
{ Democratic: 0.008499859752314085, Republican: 0.2040816326530612 },
{ Democratic: 0.011313313330330045, Republican: 0.22448979591836732 },
{ Democratic: 0.01468775765199874, Republican: 0.24489795918367346 },
{ Democratic: 0.01867419187583404, Republican: 0.26530612244897955 },
{ Democratic: 0.02332361516034985, Republican: 0.2857142857142857 },
{ Democratic: 0.02868702666406003, Republican: 0.3061224489795918 },
{ Democratic: 0.03481542554547849, Republican: 0.32653061224489793 },
{ Democratic: 0.04175981096311911, Republican: 0.3469387755102041 },
{ Democratic: 0.04957118207549574, Republican: 0.36734693877551017 },
{ Democratic: 0.05830053804112231, Republican: 0.3877551020408163 },
{ Democratic: 0.06799887801851268, Republican: 0.4081632653061224 },
{ Democratic: 0.07871720116618075, Republican: 0.42857142857142855 },
{ Democratic: 0.09050650664264036, Republican: 0.44897959183673464 },
{ Democratic: 0.10341779360640548, Republican: 0.4693877551020408 },
{ Democratic: 0.11750206121598993, Republican: 0.4897959183673469 },
{ Democratic: 0.13281030862990761, Republican: 0.5102040816326531 },
{ Democratic: 0.14939353500667232, Republican: 0.5306122448979591 },
{ Democratic: 0.16730273950479813, Republican: 0.5510204081632653 },
{ Democratic: 0.1865889212827988, Republican: 0.5714285714285714 },
{ Democratic: 0.20730307949918825, Republican: 0.5918367346938775 },
{ Democratic: 0.22949621331248024, Republican: 0.6122448979591836 },
{ Democratic: 0.2532193218811889, Republican: 0.6326530612244897 },
{ Democratic: 0.27852340436382794, Republican: 0.6530612244897959 },
{ Democratic: 0.3054594599189113, Republican: 0.673469387755102 },
{ Democratic: 0.33407848770495285, Republican: 0.6938775510204082 },
{ Democratic: 0.36443148688046634, Republican: 0.7142857142857142 },
{ Democratic: 0.3965694566039659, Republican: 0.7346938775510203 },
{ Democratic: 0.43054339603396535, Republican: 0.7551020408163265 },
{ Democratic: 0.4664043043289785, Republican: 0.7755102040816326 },
{ Democratic: 0.5042031806475191, Republican: 0.7959183673469387 },
{ Democratic: 0.5439910241481014, Republican: 0.8163265306122448 },
{ Democratic: 0.5858188339892391, Republican: 0.836734693877551 },
{ Democratic: 0.629737609329446, Republican: 0.8571428571428571 },
{ Democratic: 0.675798349327236, Republican: 0.8775510204081632 },
{ Democratic: 0.7240520531411229, Republican: 0.8979591836734693 },
{ Democratic: 0.774549719929621, Republican: 0.9183673469387754 },
{ Democratic: 0.8273423488512438, Republican: 0.9387755102040816 },
{ Democratic: 0.8824809390645053, Republican: 0.9591836734693877 },
{ Democratic: 0.9400164897279194, Republican: 0.9795918367346939 },
{ Democratic: 1.0, Republican: 1.0 }
]

//fake republican data
const coordsR = [{ Democratic: 0.00022949621331248032, Republican: 0.061224489795918366 },
  { Democratic: 0.0005439910241481014, Republican: 0.08163265306122448 },
  { Democratic: 0.0010624824690392606, Republican: 0.1020408163265306 },
  { Democratic: 0.0018359697064998426, Republican: 0.12244897959183673 },
  { Democratic: 0.0029154518950437313, Republican: 0.14285714285714285 },
  { Democratic: 0.004351928193184812, Republican: 0.16326530612244897 },
  { Democratic: 0.0061963977594369675, Republican: 0.18367346938775508 },
  { Democratic: 0.008499859752314085, Republican: 0.2040816326530612 },
  { Democratic: 0.011313313330330045, Republican: 0.22448979591836732 },
  { Democratic: 0.01468775765199874, Republican: 0.24489795918367346 },
  { Democratic: 0.01867419187583404, Republican: 0.26530612244897955 },
  { Democratic: 0.02332361516034985, Republican: 0.2857142857142857 },
  { Democratic: 0.02868702666406003, Republican: 0.3061224489795918 },
  { Democratic: 0.03481542554547849, Republican: 0.32653061224489793 },
  { Democratic: 0.04175981096311911, Republican: 0.3469387755102041 },
  { Democratic: 0.04957118207549574, Republican: 0.36734693877551017 },
  { Democratic: 0.05830053804112231, Republican: 0.3877551020408163 },
  { Democratic: 0.06799887801851268, Republican: 0.4081632653061224 },
  { Democratic: 0.07871720116618075, Republican: 0.42857142857142855 },
  { Democratic: 0.09050650664264036, Republican: 0.44897959183673464 },
  { Democratic: 0.10341779360640548, Republican: 0.4693877551020408 },
  { Democratic: 0.11750206121598993, Republican: 0.4897959183673469 },
  { Democratic: 0.13281030862990761, Republican: 0.5102040816326531 },
  { Democratic: 0.14939353500667232, Republican: 0.5306122448979591 },
  { Democratic: 0.16730273950479813, Republican: 0.5510204081632653 },
  { Democratic: 0.1865889212827988, Republican: 0.5714285714285714 },
  { Democratic: 0.20730307949918825, Republican: 0.5918367346938775 },
  { Democratic: 0.22949621331248024, Republican: 0.6122448979591836 },
  { Democratic: 0.2532193218811889, Republican: 0.6326530612244897 },
  { Democratic: 0.27852340436382794, Republican: 0.6530612244897959 },
  { Democratic: 0.3054594599189113, Republican: 0.673469387755102 },
  { Democratic: 0.33407848770495285, Republican: 0.6938775510204082 },
  { Democratic: 0.36443148688046634, Republican: 0.7142857142857142 },
  { Democratic: 0.3965694566039659, Republican: 0.7346938775510203 },
  { Democratic: 0.43054339603396535, Republican: 0.7551020408163265 },
  { Democratic: 0.4664043043289785, Republican: 0.7755102040816326 },
  { Democratic: 0.5042031806475191, Republican: 0.7959183673469387 },
  { Democratic: 0.5439910241481014, Republican: 0.8163265306122448 },
  { Democratic: 0.5858188339892391, Republican: 0.836734693877551 },
  { Democratic: 0.629737609329446, Republican: 0.8571428571428571 },
  { Democratic: 0.675798349327236, Republican: 0.8775510204081632 },
  { Democratic: 0.7240520531411229, Republican: 0.8979591836734693 },
  { Democratic: 0.774549719929621, Republican: 0.9183673469387754 },
  { Democratic: 0.8273423488512438, Republican: 0.9387755102040816 },
  { Democratic: 0.8824809390645053, Republican: 0.9591836734693877 },
  { Democratic: 0.9400164897279194, Republican: 0.9795918367346939 },
  { Democratic: 1.0, Republican: 1.0 }
  ]  

export default function SeatVoteCurve() {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart width={500} height={400} data={coordsD} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 1]} dataKey="Democratic" />
        <YAxis type="number" domain={[0, 1]} dataKey="Republican" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Republican" stroke="#FF4949" />
        <Line type="monotone" dataKey="Democratic" stroke="#0F4392" />
      </LineChart>
    </ResponsiveContainer>
  );
}
