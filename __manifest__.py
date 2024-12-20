# -*- coding: utf-8 -*-
{
    'name': "teach",

    'summary': "Short (1 phrase/line) summary of the module's purpose",

    'description': """
Long description of module's purpose
    """,

    'author': "My Company",
    'website': "https://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'web'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/teacher.xml',
        'views/student.xml',
        'views/reports/report.xml',
        'views/chart.xml',

    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    "assets": {
        "web.assets_backend": [
            "teach/static/src/xml/**/*.xml",
            "teach/static/src/js/**/*.js",
            "teach/static/src/js/*.js",
            "teach/static/src/css/*.css",
            "teach/static/src/css/**/*.css"
        ]
    },
}
