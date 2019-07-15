
const mockData = {
  totalCount: 30,
  data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
};

export function getData({size, page}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        totalCount: mockData.totalCount,
        data: mockData.data.slice(page*size, (page+1)*size)
      });
    }, 200);
  })  
}