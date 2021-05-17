import React from 'react'
import {Chart } from 'react-google-charts'
export const OrderDistribution = ({customers}) => {
    let counts = {}
    customers.forEach((x)=>{
        if(Object.keys(counts).includes(x.name)){
            counts[x.name]+=1
        }else{
            counts[x.name]=1
        }
    })
    console.log('asdasd',counts)
    return (
        <div>
            <h1>Order Distribution</h1>
            <div  className='orderDistribution'>
                <table className = 'distTable' border='1px'>
                    <thead>
                        <tr>
                            <th>No of orders</th>
                            <th>Count of customers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [1,2,3,4].map(x=>{
                                return (<tr>
                                    <td>{x}</td>
                                    <td>
                                        {Object.keys(counts).filter((key)=>{
                                            if(counts[key]==x)return true
                                        }).length}
                                    </td>
                                </tr>
                                )
                            })
                        }
                        <tr>
                            <td>5+</td>
                            <td>
                                {Object.keys(counts).filter((key)=>{
                                    if(counts[key]>4)return true
                                }).length}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['No of orders', 'Count of customers'],
                        ['1', Object.keys(counts).filter(x=>counts[x]==1).length],
                        ['2', Object.keys(counts).filter(x=>counts[x]==2).length],
                        ['3', Object.keys(counts).filter(x=>counts[x]==3).length],
                        ['4', Object.keys(counts).filter(x=>counts[x]==4).length],
                        ['5+', Object.keys(counts).filter(x=>counts[x]>4).length],
                    ]}
                    options={{
                        title: '       Order Distribution',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        </div>
    )
}
