---
title: "How to create Excel by Apache POI"
date: "2016-11-01T00:00:00.000Z"
tags: POI Java Excel
---
I often use Apache POI to deal with Microsoft Office in these days.

Today I introduce how to create Excel file by using Apache POI.

Let's create the following Excel file.

![Sample Excel]({{site.baseurl}}/images/2016-11-01-sample-excel.png)

Please refer [a previous article]({{site.baseurl}}/2016/10/24/how-to-create-powerpoint-via-poi.html)
for install of Apache POI.

#### **Step 1**
At first, create `XSSFWorkBook` object to represent work book of Excel,
and create `FileOutputStream` to write the Excel file too.

In this sample, use \"auto close feature\" from Java7.

```java
try (XSSFWorkbook book = new XSSFWorkbook();
				FileOutputStream out = new FileOutputStream("sample.xlsx")) {

    // write code here
}
```

#### **Step 2**
Create a sheet.

```java
Sheet sheet = book.createSheet();
```

#### **Step 3**
Specify a cell to write content.

```java
Row row = sheet.createRow(0);
Cell cell = row.createCell(0);
```

#### **Step 4**
Specify a format.

There are a lot of options except below, please search others.

```java
CellStyle style = book.createCellStyle();
Font font = book.createFont();
font.setColor(IndexedColors.BLUE.getIndex());
style.setWrapText(true);
style.setFont(font);
cell.setCellStyle(style);
```

#### **Step 5**
Write value to the cell.

```java
cell.setCellValue("test");
```


#### **Step 6**
Finally, write the book to a file.

```java
book.write(out);
```

Overall source code is below.

```java
package io.saitoxu.poisample;

import java.io.FileOutputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class App {
    public static void main(String[] args) throws Exception {
        try (XSSFWorkbook book = new XSSFWorkbook();
                FileOutputStream out = new FileOutputStream("sample.xlsx")) {
            Sheet sheet = book.createSheet();

            Row row = sheet.createRow(0);
            Cell cell = row.createCell(0);

            CellStyle style = book.createCellStyle();
            Font font = book.createFont();
            font.setColor(IndexedColors.BLUE.getIndex());
            style.setWrapText(true);
            style.setFont(font);
            cell.setCellStyle(style);

            cell.setCellValue("test");

            book.write(out);
        }
    }
}
```
