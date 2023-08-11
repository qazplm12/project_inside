import React from 'react';

function LanguageRank(props) {

    return (
        <div className={'shadow'}>
            <h3 className={'py-5 border-bottom text-primary'}>선호하는 언어 / 기술 스택</h3>
            <table className={'table'}>
                <thead>
                <tr>
                    <th className={'py-3'}> TOP1 </th>
                    <th className={'py-3'}> TOP2 </th>
                    <th className={'py-3'}> TOP3 </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={'py-4'}>kotlin</td>
                    <td className={'py-4'}>c++</td>
                    <td className={'py-4'}>python</td>
                </tr>
                <tr>
                    <td className={'py-4'}>00명 선호(00%)</td>
                    <td className={'py-4'}>00명 선호(00%)</td>
                    <td className={'py-4'}>00명 선호(00%)</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LanguageRank;