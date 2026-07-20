const fs = require('fs');
const data = fs.readFileSync('src/data.js', 'utf8');
const match = data.match(/export const highSchools = (\[[\s\S]*?\])\.sort/);
if (match) {
    const schools = eval(match[1]);
    console.log('--- Lý Tự Trọng ---');
    schools.filter(s => s.name.includes('Lý Tự Trọng')).forEach(s => console.log(s.id, s.name, s.quota));
    console.log('--- Minh Khai ---');
    schools.filter(s => s.name.includes('Minh Khai')).forEach(s => console.log(s.id, s.name, s.quota));
    console.log('--- Vị Thanh ---');
    schools.filter(s => s.name.includes('Vị Thanh') || s.name.includes('chuyên Vị Thanh')).forEach(s => console.log(s.id, s.name, s.quota));
}
