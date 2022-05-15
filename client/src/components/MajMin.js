import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const colorings = ['#ffac81', '#c6def1', '#ff928b', '#efe9ae', '#cdeac0'];

const data = [
    {
        Asian: 1,
        Black: 2,
        Latino: 1
    },
    {
        Asian: 1,
        Black: 1,
        Latino: 1
    },
    {
        Asian: 1,
        Black: 2,
        Latino: 1
    },
    {
        Asian: 1,
        Black: 2,
        Latino: 1
    },
    {
        Asian: 0,
        Black: 2,
        Latino: 1
    },
    {
        Asian: 2,
        Black: 2,
        Latino: 1
    },
    {
        Asian: 1,
        Black: 2,
        Latino: 3
    },
];

export default function MajMin() {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tick={['Black', 'Asian', 'Latino']} label={{ value: 'Number of Districts', dy: 12 }} />
                <YAxis yAxisId="left" orientation="left" label={{ value: 'Number of Plans', angle: -90, position: "outsideLeft", dx: -20 }}
                    domain={[0, 5]} tickCount={6} tick={[0, 1, 2, 3, 4, 5]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="Black" fill={colorings[0]} />
                <Bar yAxisId="left" dataKey="Asian" fill={colorings[1]} />
                <Bar yAxisId="left" dataKey="Latino" fill={colorings[2]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
