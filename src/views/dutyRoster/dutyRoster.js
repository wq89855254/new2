const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      attrs: {},
    };
    if (index === 4) {
      obj.attrs.colSpan = 0;
    }
    return obj;
  };
  
const tableData = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  }, {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  }];
  
// const columns = [
//     {
//         title: '一级值班',
//         dataIndex: 'levelDuty',
//         colSpan:2,
//         customRender: (value, row, index) => {
//             const obj = {
//               children: value,
//               attrs: {},
//             };
//             if (index === 2) {
//               obj.attrs.rowSpan = 2;
//             }
//             // These two are merged into above cell
//             if (index === 3) {
//               obj.attrs.rowSpan = 0;
//             }
//             if (index === 4) {
//               obj.attrs.colSpan = 0;
//             }
//             return obj;
//           },
          

//     },
//     {
//         title: 'week',
//         colSpan: 0,
//         dataIndex: 'week',
//         customRender: renderContent,
//     },
//     {
//         title:'副首席',
//         dataIndex: 'deputyChief',
        

//     },
//     {
//         title:'应急副首席',
//         dataIndex: 'emergencyChief',
//         customRender: renderContent,

//     },
//     {
//         title:'领班大夜',
//         dataIndex: 'foremanNight',

//     },
//     {
//         title:'领班白班',
//         dataIndex: 'foremanDay',

//     },
//     {
//         title:'主班',
//         dataIndex: 'mainDuty',

//     },
//     {
//         title:'应急主班',
//         dataIndex: 'emergencyMainDuty',

//     },
//     {
//         title:'跟随(领班)',
//         dataIndex: 'follow',

//     }

// ]
// const tableData = [{
//     key: '1',
//     levelDuty: '1',
//     week:'二',
//     deputyChief:'樊利强',
//     emergencyChief:'杨波',
//     foremanNight: '周康辉',
//     foremanDay: '康文苑',
//     mainDuty:'曹艳察',
//     emergencyMainDuty:'曹艳察',
//     follow:'尤悦'
//   },{
//     key: '2',
//     levelDuty: '2',
//     week:'二',
//     deputyChief:'樊利强',
//     emergencyChief:'杨波',
//     foremanNight: '周康辉',
//     foremanDay: '康文苑',
//     mainDuty:'曹艳察',
//     emergencyMainDuty:'曹艳察',
//     follow:'尤悦'
//   },{
//     key: '3',
//     levelDuty: '3',
//     week:'二',
//     deputyChief:'樊利强',
//     emergencyChief:'杨波',
//     foremanNight: '周康辉',
//     foremanDay: '康文苑',
//     mainDuty:'曹艳察',
//     emergencyMainDuty:'曹艳察',
//     follow:'尤悦'
//   }]

  
  
export default{
    data() {
        const columns = [{
          title: 'Name',
          dataIndex: 'name',
          customRender: (text, row, index) => {
            if (index < 4) {
              return <a href="javascript:;">{text}</a>;
            }
            return {
              children: <a href="javascript:;">{text}</a>,
              attrs: {
                colSpan: 5,
              },
            };
          },
        }, {
          title: 'Age',
          dataIndex: 'age',
          customRender: renderContent,
        }, {
          title: 'Home phone',
          colSpan: 2,
          dataIndex: 'tel',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 2) {
              obj.attrs.rowSpan = 2;
            }
            // These two are merged into above cell
            if (index === 3) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          },
        }, {
          title: 'Phone',
          colSpan: 0,
          dataIndex: 'phone',
          customRender: renderContent,
        }, {
          title: 'Address',
          dataIndex: 'address',
          customRender: renderContent,
        }];
        return {
          tableData,
          columns,
        }
      }
}