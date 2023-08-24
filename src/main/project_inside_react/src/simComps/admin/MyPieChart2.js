import React, {useEffect, useState} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';

// 실제 데이터 가져오기

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4756', '#42FF48'];

const RADIAN = Math.PI / 180;

const CustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, value, name, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <g>
            <text x={x + 10} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${name}`}
            </text>
        </g>
    );
};

const ValueTable = ({data}) => {
    return (
        <div className={'my-auto ms-3'}>
            <table className={'table'} style={{fontSize : '14px'}}>
                <thead >
                <tr style={{whiteSpace:'nowrap'}}>
                    <th>난이도</th>
                    <th>문제</th>
                </tr>
                </thead>
                <tbody>
                {data.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.name}</td>
                        <td>{entry.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const MyPieChart2 = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {

        const levelCounts = {};
        for (let level = 0; level <= 5; level++) {
            levelCounts[`Lv.${level}`] = props.challengeList.filter(item => item.challengeClass === level).length;
        }

        const newData = Object.entries(levelCounts).map(([name, value]) => ({ name, value }));
        setData(newData);

    }, [props.challengeList]);

    return (
        <div className="d-flex ms-2">
            <ValueTable data={data}/>
            <ResponsiveContainer width="100%" height={200} className={'my-auto'}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={CustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MyPieChart2;