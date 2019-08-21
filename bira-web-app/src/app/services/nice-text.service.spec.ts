import { TestBed } from '@angular/core/testing';

import { NiceTextService } from './nice-text.service';

describe('NiceTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NiceTextService = TestBed.get(NiceTextService);
    expect(service).toBeTruthy();
  });

  describe('getNiceNameForId', () => {
    it('should make id column nice', () => {
      const service: NiceTextService = TestBed.get(NiceTextService);
      expect(service.getNiceNameForId('userId')).toEqual('User');
    });
  });

  describe('getTypeForId', () => {
    it('should get the type from id column', () => {
      const service: NiceTextService = TestBed.get(NiceTextService);
      expect(service.getTypeForId('userId')).toEqual('users');
    });
  });

  describe('getSingular', () => {
    it('should get the type from id column', () => {
      const service: NiceTextService = TestBed.get(NiceTextService);
      expect(service.getSingular('users')).toEqual('user');
    });
  });

  describe('getIdForType', () => {
    it('should get the type from id column', () => {
      const service: NiceTextService = TestBed.get(NiceTextService);
      expect(service.getIdForType('users')).toEqual('userId');
    });
  });
});
