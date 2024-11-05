import { Request, Response } from 'express';
import ExcelJS from 'exceljs';
import { chats } from '../models/chatModel';
import { users } from '../models/userModel';

export const importChatHistory = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);

    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return; // Skip header row
      const userId = row.getCell(1).value as number;
      const message = row.getCell(2).value as string;
      const timestamp = row.getCell(3).value as string;

      // Validate if user exists
      const user = users.find(u => u.id === userId);
      if (!user) {
        console.error(`Invalid user ID ${userId} in row ${rowIndex}`);
        return;
      }

      // Add the chat message to the database (mocked here)
      chats.push({ userId, message, timestamp });
    });

    res.status(200).json({ message: 'Chat history imported successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing the Excel file.', error });
  }
};
