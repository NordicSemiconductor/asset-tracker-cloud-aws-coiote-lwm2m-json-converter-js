# LwM2M TypeScript type definitions and JSON schema [![npm version](https://img.shields.io/npm/v/@nordicsemiconductor/asset-tracker-cloud-aws-coiote-shadow-converter.svg)](https://www.npmjs.com/package/@nordicsemiconductor/asset-tracker-cloud-aws-coiote-shadow-converter)

[![Test and Release](https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-coiote-shadow-converter-js/actions/workflows/test-and-release.yaml/badge.svg)](https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-coiote-shadow-converter-js/actions/workflows/test-and-release.yaml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Mergify Status](https://img.shields.io/endpoint.svg?url=https://api.mergify.com/v1/badges/NordicSemiconductor/asset-tracker-cloud-aws-coiote-shadow-converter-js)](https://mergify.io)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

Convert the LwM2M JSON encoding written by
[AVSystem's Coiote AWS integration](https://iotdevzone.avsystem.com/docs/Cloud_integrations/AWS_IoT_Core/Configuring_AWS_integration/)
to
[nRF Asset Tracker's LwM2M JSON encoding](https://github.com/NordicSemiconductor/lwm2m-types-js).

## Installation

```bash
npm ci
npm test
```

## Input

```json
{
  "state": {
    "reported": {
      "Temperature": {
        "0": {
          "Application Type": "",
          "Fractional Timestamp": {
            "noValue": true
          },
          "Max Measured Value": "23.51",
          "Max Range Value": "85.0",
          "Measurement Quality Indicator": {
            "noValue": true
          },
          "Measurement Quality Level": {
            "noValue": true
          },
          "Min Measured Value": "23.51",
          "Min Range Value": "-40.0",
          "Reset Min and Max Measured Values": {
            "noValue": true
          },
          "Sensor Units": "Celsius degrees",
          "Sensor Value": "24.57",
          "Timestamp": "2022-10-07T13:33:22Z"
        }
      }
    }
  }
}
```

## Output

```json
{
  "3303:1.1": [
    {
      "5518": 1665149633,
      "5601": 23.51,
      "5602": 23.51,
      "5603": -40,
      "5604": 85,
      "5700": 24.57,
      "5701": "Celsius degrees"
    }
  ]
}
```
