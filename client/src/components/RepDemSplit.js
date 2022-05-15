import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '0',
        Republican: 40,
        Democratic: 24,
    },
    {
        name: '1',
        Republican: 30,
        Democratic: 13,
    },
    {
        name: '2',
        Republican: 20,
        Democratic: 98,
    },
    {
        name: '3',
        Republican: 27,
        Democratic: 39,
    },
    {
        name: '4',
        Republican: 18,
        Democratic: 48,
    },
    {
        name: '5',
        Republican: 23,
        Democratic: 38,
    },
    {
        name: '6',
        Republican: 34,
        Democratic: 43,
    },
];

export default function RepDemSplit() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" domain={[0, 10]} tickCount={10} tick={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    label={{ value: 'Number of Seats', dy: 12 }} />
                <YAxis yAxisId="left" orientation="left" label={{ value: 'Number of District Plans', angle: -90, position: "outsideLeft", dx: -15 }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="Republican" fill="red" />
                <Bar yAxisId="left" dataKey="Democratic" fill="blue" />
            </BarChart>
        </ResponsiveContainer>
    );
}
