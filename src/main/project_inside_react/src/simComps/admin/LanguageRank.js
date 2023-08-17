import React, {useEffect, useState} from 'react';

function LanguageRank(props) {

    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const langArr = [];

    // join 은 배열의 요소를 문자열로 합치는 것
    useEffect(() => {
        props.userList.map((item, index, array) => {
            if (item.personLanguage !== null) {
                item.personLanguage.split(", ").map((lang) => {
                    langArr.push(lang)
                });
            }
        });

        //
        const countMap = {};
        for (const item of langArr) {
            if (!countMap[item]) {
                countMap[item] = 1;
            } else {
                countMap[item]++;
            }
        }

        const countedValues = Object.entries(countMap).sort((a, b) => b[1] - a[1]);

        const top3Values = countedValues.slice(0, 3).map(([value, count]) => ({ value, count }));
        setData(top3Values);
        setTotalCount(langArr.length)

    }, [props.userList]);

    return (
        <div className={'shadow'}>
            <h3 className={'py-5 border-bottom text-primary'}>선호하는 언어 / 기술 스택</h3>
            <table className={'table'}>
                <thead>
                <tr>
                    <th className={'py-3'}> TOP1</th>
                    <th className={'py-3'}> TOP2</th>
                    <th className={'py-3'}> TOP3</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {
                        data.map((item, index, array) => (
                            <td key={index} className={'py-4'}>{item.value}</td>
                        ))
                    }
                </tr>
                <tr>
                    {
                        data.map((item, index, array) => (
                            <td key={index} className={'py-4'}>{item.count}명 선호({Math.round(Number(item.count) / totalCount * 100)}%)</td>
                        ))

                    }
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default LanguageRank;