const expect  = require('expect');

const  {isValidString} = require('./validation');

describe('isvalid string',()=>{
    it('number validation should be fail',()=>{
        expect(isValidString(123)).toBe(false);
    })
    it('spcace validation should be fail',()=>{
        expect(isValidString('   ')).toBe(false);
    })
    it(' validation should be pass',()=>{
        expect(isValidString('  f ')).toBe(true);
    })
})