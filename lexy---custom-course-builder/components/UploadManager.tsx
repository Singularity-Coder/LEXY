
import React, { useState } from 'react';
import { CourseData, CultureItem } from '../types';
import JSZip from 'jszip';

interface UploadManagerProps {
  onCourseLoaded: (course: CourseData, mediaMap: Map<string, string>) => void;
  existingCourses: string[]; // Pass language names or IDs to detect conflicts
}

const UploadManager: React.FC<UploadManagerProps> = ({ onCourseLoaded, existingCourses }) => {
  const [lexyFile, setLexyFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLexyFile(e.target.files[0]);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleUpload = async () => {
    if (!lexyFile) {
      setError("Please select a .lexy course file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Load the .lexy ZIP package
      const zip = await JSZip.loadAsync(lexyFile);
      
      // 2. Find and parse manifest.json
      const manifestFile = zip.file("manifest.json");
      if (!manifestFile) {
        throw new Error("Invalid .lexy file: manifest.json not found.");
      }

      const manifestContent = await manifestFile.async("string");
      const manifest = JSON.parse(manifestContent);

      if (manifest.format !== "lexy-package") {
        throw new Error("Invalid file format. This is not a Lexy package.");
      }

      const language = manifest.fields?.language || "Unknown";

      // 3. Conflict Detection
      const hasConflict = existingCourses.some(lang => lang.toLowerCase() === language.toLowerCase());
      if (hasConflict) {
        const confirmed = window.confirm(
          `A course for "${language}" already exists. Do you want to replace its content with this import?`
        );
        if (!confirmed) {
          setIsLoading(false);
          return;
        }
      }

      // 4. Extract Linked Data Files
      const dataFiles = manifest.dataFiles || {};
      
      const loadJson = async (path: string) => {
        const file = zip.file(path);
        if (!file) return [];
        return JSON.parse(await file.async("string"));
      };

      const dictionary = dataFiles.dictionary ? await loadJson(dataFiles.dictionary.path) : [];
      const grammar = dataFiles.grammar ? await loadJson(dataFiles.grammar.path) : [];
      const cultureItems = (dataFiles.culture ? await loadJson(dataFiles.culture.path) : []) as CultureItem[];
      const units = dataFiles.units ? await loadJson(dataFiles.units.path) : [];

      // 5. Re-attach assets from zip to base64 for app usage
      for (const item of cultureItems) {
        // Handle thumbnail
        if (item.thumbnailUrl && item.thumbnailUrl.startsWith('assets/')) {
          const file = zip.file(item.thumbnailUrl);
          if (file) {
            const blob = await file.async("blob");
            item.thumbnailUrl = await blobToBase64(blob);
          }
        }
        
        // Handle assets
        if (item.assets) {
          for (const asset of item.assets) {
            if (asset.value.startsWith('assets/')) {
              const file = zip.file(asset.value);
              if (file) {
                const blob = await file.async("blob");
                asset.value = await blobToBase64(blob);
              }
            }
          }
        }
      }

      // 6. Construct Final CourseData
      const courseData: CourseData = {
        id: manifest.courseId || `course-${Date.now()}`,
        courseTitle: manifest.fields?.title || "Imported Course",
        language: language,
        units: units,
        dictionary: dictionary,
        grammar: grammar,
        cultureItems: cultureItems
      };
      
      // 7. Media mapping
      const mediaMap = new Map<string, string>();
      
      onCourseLoaded(courseData, mediaMap);
      
      // Clear file after success
      setLexyFile(null);
      const input = document.getElementById('lexy-upload-input') as HTMLInputElement;
      if (input) input.value = '';
      
    } catch (err) {
      console.error(err);
      setError("Failed to process .lexy file. Ensure it is a valid package.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-0 bg-transparent space-y-4">
      <div className="space-y-2">
        <input 
          id="lexy-upload-input"
          type="file" 
          accept=".lexy,.zip"
          onChange={handleFileChange}
          className="w-full p-4 border-2 border-dashed rounded-2xl border-gray-100 focus:border-[#ad46ff] outline-none text-xs font-bold text-gray-400 bg-gray-50/50 cursor-pointer"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-xs font-bold border-2 border-red-100 flex items-center gap-3">
          <span>⚠️</span>
          {error}
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={handleUpload}
          disabled={isLoading || !lexyFile}
          className={`w-full p-4 rounded-2xl font-extrabold text-white transition-all transform active:scale-95 uppercase tracking-wider text-xs ${
            !lexyFile ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#1cb0f6] border-b-4 border-[#1899d6]'
          }`}
        >
          {isLoading ? 'Processing...' : 'Import LEXY'}
        </button>
      </div>
    </div>
  );
};

export default UploadManager;
