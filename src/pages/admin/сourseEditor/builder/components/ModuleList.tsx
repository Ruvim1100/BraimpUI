import { Box, Button, Divider, Skeleton, Typography } from "@mui/material";
import { ModuleItem } from "./ModuleItem";
import { useTranslation } from "react-i18next";
import type { LessonLookupModel } from "../../../../../models/modules/getModules";

export interface Module {
  id: string;
  title: string;
  isPublished: boolean;
  sortIndex: number;
  lessons: LessonLookupModel[];
}

interface ModuleListProps {
  modules: Module[];
  onLessonSelect: (lesson: {
    id: string;
    moduleId: string;
  }) => void;
}

export const ModuleList = ({ modules, onLessonSelect }: ModuleListProps) => {
  const { t } = useTranslation();

  if (!modules) {
    return (
      <>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} animation={i % 2 ? "wave" : false} />
        ))}
      </>
    );
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h6">Структура курса</Typography>
      </Box>
      {modules.length === 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mt={2}
        >
          {t("admin.noModulesYet")}
        </Typography>
      )}
      <Box>
        {modules.map((module) => (
          <ModuleItem
            key={module.id}
            id={module.id}
            title={module.title}
            isPublished={module.isPublished}
            sortIndex={module.sortIndex}
            lessons={module.lessons}
            onLessonSelect={onLessonSelect}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />
      <Button variant="contained" size="small" sx={{ width: "100%" }}>
        + Добавить модуль
      </Button>
    </Box>
  );
};
