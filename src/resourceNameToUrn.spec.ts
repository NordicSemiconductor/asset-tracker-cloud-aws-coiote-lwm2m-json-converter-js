import { resourceNameToUrn } from './resourceNameToUrn.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

void describe('resourceNameToUrn', () => {
	for (const [resourceName, expectedURN] of [
		['Connectivity Monitoring', '4:1.3@1.1'], // ConnectivityMonitoring_4_urn
		['Humidity', '3304:1.1'], // Humidity_3304_urn
		// Special case, because of conflict
		['Location', '6'], // Location_6_urn
		//
		['ECID-Signal Measurement Information', '10256'], //ECID_SignalMeasurementInformation_10256_urn
		// FIXME: Provided by Coiote, check LwM2M and Object version
		['Device', '3:1.2@1.1'], // Device_3_urn
		// FIXME: Provided by Coiote, check LwM2M and Object version
		['Firmware Update', '5:1.2@1.1'], // FirmwareUpdate_5_urn

		['Pressure', '3323:1.1'], // Pressure_3323_urn
		['Push button', '3347:1.1'], // Pushbutton_3347_urn
		['Temperature', '3303:1.1'], // Temperature_3303_urn
		// asset_tracker_v2 configuration, not registered in LwM2M object registry
		// FIXME: Access Coiote Dialects, check LwM2M object ID, LwM2M version, Object version
		['Configuration', '50009@1.2'],
		// Can be ignored
		['LwM2M Server', '1:1.2@1.2'], // LwM2MServer_1_urn
		// Ignored, because not needed in nRF Asset Tracker
		['Location Assistance', null],
	] as [string, unknown][]) {
		void it(`should convert the resource name "${resourceName}" to the URN "${expectedURN}"`, () => {
			assert.strictEqual(resourceNameToUrn(resourceName), expectedURN)
		})
	}

	void it('should return null for unknown objects'),
		() => assert.strictEqual(resourceNameToUrn('foo'), null)
})
