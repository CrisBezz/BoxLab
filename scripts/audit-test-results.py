#!/usr/bin/env python3
"""Inventory Node JUnit failures; classify evidence, never suppress test failures.
Run node --test --test-reporter=junit tests/*.test.mjs > /tmp/boxlab.xml first.
Usage: python scripts/audit-test-results.py /tmp/boxlab.xml output.json
"""
import collections, json, re, sys, xml.etree.ElementTree as ET
from pathlib import Path


def inventory(input_path):
    cases = ET.parse(input_path).getroot().findall('.//testcase')
    rows = []
    for case in cases:
        failure = case.find('failure')
        if failure is None:
            continue
        message = failure.get('message', '')
        filename = Path(case.get('file', '')).name
        prefix = message.split('Input:')[0]
        if message == 'test failed':
            category = 'aggregate-script'
        elif filename == 'scene-obj-export-444.test.mjs' and 'o Closed Cube' in prefix:
            category = 'obj-output-contract'
        elif ('regular expression' in message and re.search(r'(\\\?v=|version:|data-release-version|<title>|v0\\\.36|v0\.36)', prefix)) or ('falsy value' in message and ('src/' in message or '?v=' in message)) or ('strictly equal' in message and re.search(r'0\.36\.', message)):
            category = 'version-pin-assertion'
        elif 'regular expression' in message or 'falsy value' in message:
            category = 'source-pattern-review'
        elif filename in {'453-load-boundary.test.mjs', '453-no-render-reformat.test.mjs', '453-no-source-mesh-helper.test.mjs', 'facegroup-colour-core-451-sentinel.test.mjs', 'no-facegroups-ui-453.test.mjs', 'recovery-453-render-modes.test.mjs'}:
            category = 'rollback-sentinel-review'
        else:
            category = 'unclassified-behaviour-review'
        rows.append({'file': 'tests/' + filename, 'test': case.get('name'),
                     'category': category, 'assertion': prefix.strip()[:2000]})
    return {'total': len(cases), 'passed': sum(c.find('failure') is None and c.find('skipped') is None for c in cases),
            'failed': len(rows), 'skipped': sum(c.find('skipped') is not None for c in cases),
            'classification_counts': dict(collections.Counter(r['category'] for r in rows)),
            'failures': rows}


if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit('Usage: audit-test-results.py input.xml output.json')
    result = inventory(sys.argv[1])
    Path(sys.argv[2]).write_text(json.dumps(result, indent=2, ensure_ascii=False) + '\n')
    print(json.dumps({k: v for k, v in result.items() if k != 'failures'}, indent=2))
