/**
 * @fileoverview Unit tests for util.js
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */
/* eslint-env node, mocha */

// eslint-disable-next-line no-unused-vars
const should = require('should')

const util = require('../lib/util')

describe('util', () => {
  describe('csvToArray()', () => {
    it('should work with properly formatted strings', () => {
      util.csvToArray('1,2,3,4').should.deepEqual(['1', '2', '3', '4'])
      util.csvToArray('1234').should.deepEqual(['1234'])
      util.csvToArray('asdf,bef,efe').should.deepEqual(['asdf', 'bef', 'efe'])
      util.csvToArray('asdf').should.deepEqual(['asdf'])
    })

    it('should work with trailing/leading commas', () => {
      util.csvToArray('1,2,3,').should.deepEqual(['1', '2', '3'])
      util.csvToArray(',a,b,c').should.deepEqual(['a', 'b', 'c'])
      util.csvToArray(',1,c,4,').should.deepEqual(['1', 'c', '4'])
    })

    it('should trim spaces from elements', () => {
      util.csvToArray('bob, the, bu').should.deepEqual(['bob', 'the', 'bu'])
      util.csvToArray('bob , the , bu').should.deepEqual(['bob', 'the', 'bu'])
    })

    it('should not fail on edge cases', () => {
      util.csvToArray('').should.deepEqual([])
      util.csvToArray(' ').should.deepEqual([])
      util.csvToArray('            ').should.deepEqual([])
      util.csvToArray('\n').should.deepEqual([])
      util.csvToArray('\t').should.deepEqual([])
      util.csvToArray(null).should.deepEqual([])
      util.csvToArray().should.deepEqual([])
    })
  })

  describe('csvToObject()', () => {
    it('should work with properly formatted strings', () => {
      util.csvToObject('1:2,3:4').should.deepEqual({ 1: '2', 3: '4' })
      util.csvToObject('a:c,asdf:3').should.deepEqual({ a: 'c', asdf: '3' })
      util.csvToObject('a:c,b:null').should.deepEqual({ a: 'c', b: 'null' })
    })

    it('should omit improper key:value pairs', () => {
      util.csvToObject('sdf:c:d').should.deepEqual({})
      util.csvToObject('asdf:fe,bob:e:f').should.deepEqual({ asdf: 'fe' })
      util.csvToObject('a:b,').should.deepEqual({ a: 'b' })
      util.csvToObject(',a:b,').should.deepEqual({ a: 'b' })
      util.csvToObject(',a:b,,,').should.deepEqual({ a: 'b' })
      util.csvToObject('a:b e, c: d e').should.deepEqual({})
      util.csvToObject('a::b').should.deepEqual({})
    })

    it('should not fail on edge cases', () => {
      util.csvToObject('').should.deepEqual({})
      util.csvToObject(' ').should.deepEqual({})
      util.csvToObject('\n').should.deepEqual({})
      util.csvToObject('\t').should.deepEqual({})
      util.csvToObject(null).should.deepEqual({})
      util.csvToObject().should.deepEqual({})
    })
  })

  describe('parseForwardingRule()', () => {
    const badResult = {
      protocol: null,
      port: null
    }

    it('should work with properly formatted strings', () => {
      util.parseForwardingRule('http:234').should.deepEqual({
        protocol: 'http',
        port: 234
      })
      util.parseForwardingRule('https:833').should.deepEqual({
        protocol: 'https',
        port: 833
      })
      util.parseForwardingRule('http2:8000').should.deepEqual({
        protocol: 'http2',
        port: 8000
      })
      util.parseForwardingRule('tcp:200').should.deepEqual({
        protocol: 'tcp',
        port: 200
      })
    })

    it('should populate the result with null for invalid strings', () => {
      util.parseForwardingRule('h:3').should.deepEqual(badResult)
      util.parseForwardingRule('http:a').should.deepEqual(badResult)
      util.parseForwardingRule('http:341a').should.deepEqual(badResult)
      util.parseForwardingRule(':tcp:3000').should.deepEqual(badResult)
      util.parseForwardingRule('tcp:3000:').should.deepEqual(badResult)
      util.parseForwardingRule(':tcp:3000:').should.deepEqual(badResult)
      util.parseForwardingRule('tcp::3000').should.deepEqual(badResult)
    })

    it('should not fail on edge cases', () => {
      util.parseForwardingRule('').should.deepEqual(badResult)
      util.parseForwardingRule(' ').should.deepEqual(badResult)
      util.parseForwardingRule('\n').should.deepEqual(badResult)
      util.parseForwardingRule(null).should.deepEqual(badResult)
      util.parseForwardingRule().should.deepEqual(badResult)
    })
  })
})
