/*
  Warnings:

  - The `status` column on the `ai_models` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `source` on the `ai_providers` table. All the data in the column will be lost.
  - The `status` column on the `ai_providers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `ai_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `chat_participants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `chat_participants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `visibility` column on the `chat_sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `chat_sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `permission` column on the `chat_share_links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `upload_status` column on the `message_attachments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `messages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `reference_type` column on the `point_transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `point_wallets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `bot_type` on the `bot_profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `storage_provider` on the `message_attachments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sender_type` on the `messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `transaction_type` on the `point_transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "AiProviderStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "AiModelStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "BotType" AS ENUM ('PROMPT', 'IMAGE_GENERATION', 'VIDEO_GENERATION', 'ROLEPLAY', 'SCRIPT', 'SERVER');

-- CreateEnum
CREATE TYPE "ChatSessionVisibility" AS ENUM ('PRIVATE', 'INVITED', 'PUBLIC_READONLY');

-- CreateEnum
CREATE TYPE "ChatSessionStatus" AS ENUM ('ACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "ChatParticipantRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "ChatParticipantStatus" AS ENUM ('ACTIVE', 'INVITED', 'REMOVED', 'LEFT');

-- CreateEnum
CREATE TYPE "ChatSharePermission" AS ENUM ('VIEW', 'CHAT');

-- CreateEnum
CREATE TYPE "MessageSenderType" AS ENUM ('USER', 'BOT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM', 'TOOL');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('PENDING', 'STREAMING', 'COMPLETED', 'FAILED', 'EDITED', 'DELETED');

-- CreateEnum
CREATE TYPE "StorageProvider" AS ENUM ('S3', 'R2', 'SUPABASE');

-- CreateEnum
CREATE TYPE "MessageAttachmentStatus" AS ENUM ('PENDING', 'UPLOADED', 'FAILED', 'DELETED');

-- CreateEnum
CREATE TYPE "AiRequestStatus" AS ENUM ('SUCCESS', 'ERROR', 'TIMEOUT', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PointWalletStatus" AS ENUM ('ACTIVE', 'LOCKED');

-- CreateEnum
CREATE TYPE "PointTransactionType" AS ENUM ('TOPUP', 'USAGE_DEBIT', 'REFUND', 'BONUS', 'ADMIN_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "PointReferenceType" AS ENUM ('AI_REQUEST', 'PAYMENT', 'ADMIN_ACTION');

-- AlterTable
ALTER TABLE "ai_models" DROP COLUMN "status",
ADD COLUMN     "status" "AiModelStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "ai_providers" DROP COLUMN "source",
DROP COLUMN "status",
ADD COLUMN     "status" "AiProviderStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "ai_requests" DROP COLUMN "status",
ADD COLUMN     "status" "AiRequestStatus" NOT NULL DEFAULT 'SUCCESS';

-- AlterTable
ALTER TABLE "bot_profiles" DROP COLUMN "bot_type",
ADD COLUMN     "bot_type" "BotType" NOT NULL;

-- AlterTable
ALTER TABLE "chat_participants" DROP COLUMN "role",
ADD COLUMN     "role" "ChatParticipantRole" NOT NULL DEFAULT 'EDITOR',
DROP COLUMN "status",
ADD COLUMN     "status" "ChatParticipantStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "chat_sessions" DROP COLUMN "visibility",
ADD COLUMN     "visibility" "ChatSessionVisibility" NOT NULL DEFAULT 'PRIVATE',
DROP COLUMN "status",
ADD COLUMN     "status" "ChatSessionStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "chat_share_links" DROP COLUMN "permission",
ADD COLUMN     "permission" "ChatSharePermission" NOT NULL DEFAULT 'VIEW';

-- AlterTable
ALTER TABLE "message_attachments" DROP COLUMN "storage_provider",
ADD COLUMN     "storage_provider" "StorageProvider" NOT NULL,
DROP COLUMN "upload_status",
ADD COLUMN     "upload_status" "MessageAttachmentStatus" NOT NULL DEFAULT 'UPLOADED';

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "sender_type",
ADD COLUMN     "sender_type" "MessageSenderType" NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "MessageRole" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "MessageStatus" NOT NULL DEFAULT 'COMPLETED';

-- AlterTable
ALTER TABLE "point_transactions" DROP COLUMN "transaction_type",
ADD COLUMN     "transaction_type" "PointTransactionType" NOT NULL,
DROP COLUMN "reference_type",
ADD COLUMN     "reference_type" "PointReferenceType";

-- AlterTable
ALTER TABLE "point_wallets" DROP COLUMN "status",
ADD COLUMN     "status" "PointWalletStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
