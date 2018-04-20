const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

describe('generate message functiom test',()=>{
    it('should generate a object',()=>{
        let from = 'bhavesh';
        let text = 'hell world';
        let obj = generateMessage(from,text);
        expect(obj.from).toBe(from);
        expect(obj.text).toBe(text);
        expect(typeof obj.createdAt).toBe('number')
    })
});
describe('generateLocationMessage',()=>{
    it('should generate location url',()=>{
        let from = 'admin';
        let latitude = 23;
        let longitude = 72;
        let obj = generateLocationMessage(from,latitude,longitude)
        expect(obj.from).toBe(from);
        expect(obj.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(typeof obj.createdAt).toBe('number');
    })
})
